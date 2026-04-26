'use server';

import { generateObject } from 'ai';
import { z } from 'zod';
import { scout, geminiFlashLite, withFallback } from '@/ai/providers';
import { getSubcategoryContext } from '@/ai/subcategory-contexts';

// ── Schemas ───────────────────────────────────────────────────────────────

export const ProjectInstructionGeneratorInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('What the user wants to build or accomplish.'),
  instructionMode: z
    .enum(['byTheBook', 'macgyver'])
    .describe(
      '"byTheBook" = standard safe methods following codes and best practices. ' +
      '"macgyver" = resourceful improvised solutions using on-hand materials.'
    ),
  category: z.string().optional().describe('Broad project category (e.g. "Plumbing", "Garden").'),
  subcategory: z.string().optional().describe('Specific subcategory (e.g. "Drip Irrigation", "Raised Beds").'),
  userInventory: z
    .string()
    .optional()
    .describe('Comma-separated list of items the user already owns.'),
});
export type ProjectInstructionGeneratorInput = z.infer<
  typeof ProjectInstructionGeneratorInputSchema
>;

export const ProjectInstructionGeneratorOutputSchema = z.object({
  projectName: z.string().describe('Concise title for this DIY project.'),
  difficultyLevel: z
    .enum(['Beginner', 'Intermediate', 'Advanced', 'Expert'])
    .describe('Technical difficulty, calibrated to a homesteader without trade certification.'),
  safetyPrecautions: z
    .array(z.string())
    .describe(
      'Essential safety steps and PPE. List specific items (e.g. "ANSI Z87.1 safety glasses") ' +
      'not vague advice ("be careful"). Include code references for electrical/structural work.'
    ),
  estimatedTime: z
    .string()
    .describe('Realistic time range for a competent DIYer, e.g. "2–4 hours", "Half a day".'),
  toolsAndItemsNeeded: z
    .array(z.string())
    .describe(
      'Every tool and material required. For anything that can be done with either a hand tool ' +
      'OR a power tool, list both separated by " or " (e.g. "Hand saw or Circular saw"). ' +
      'Mark items the user already owns as "[In Inventory]".'
    ),
  proTips: z
    .array(z.string())
    .describe(
      'Trade secrets and time-savers a professional would know. Each tip should explain ' +
      'the *why*, not just the what. Aim for 3–5 tips maximum.'
    ),
  steps: z
    .array(
      z.object({
        stepNumber: z.number(),
        description: z
          .string()
          .describe(
            'Actionable instruction. Include the reasoning for any non-obvious action ' +
            '(e.g. "Apply primer before paint — bare wood absorbs moisture and causes peeling"). ' +
            'Target 2–4 sentences per step.'
          ),
      })
    )
    .describe('Sequential steps. Aim for 5–12 steps; split or merge to avoid single-sentence or essay-length steps.'),
  disclaimer: z
    .string()
    .optional()
    .describe(
      'Required for macgyver mode only. Warn about specific risks of the improvised method, ' +
      'not generic boilerplate. E.g. "Using PVC cement on Schedule 80 fittings rated for potable ' +
      'water requires 24-hour cure time; skipping this risks joint failure under pressure."'
    ),
  contractorRecommendation: z
    .string()
    .optional()
    .describe(
      'Populate ONLY when the DIY/MacGyver path involves real risk of injury, structural failure, ' +
      'code violation, or permit requirement. Name the specific trade (e.g. "Licensed electrician " +' +
      '"for panel work" not just "a professional").'
    ),
});
export type ProjectInstructionGeneratorOutput = z.infer<
  typeof ProjectInstructionGeneratorOutputSchema
>;


// ── Prompt ────────────────────────────────────────────────────────────────

/**
 * PROMPT NOTES (what changed from the original and why):
 *
 * 1. HANDLEBARS REMOVED — the original used Genkit's Handlebars syntax
 *    ({{#ifEquals}}, {{jsonSchema}}, {{{triple-stache}}}). All conditional
 *    logic is now handled in TypeScript before the prompt is built, which
 *    is more readable and testable.
 *
 * 2. STEP COUNT GUIDANCE — original had no guidance, leading to wildly
 *    inconsistent output (2 steps for a complex project, 20 for a simple
 *    one). The schema now targets 5–12 steps and the prompt reinforces it.
 *
 * 3. DIFFICULTY CALIBRATION — original defined difficulty but didn't tell
 *    the model how to calibrate it. Added explicit anchor: "a homesteader
 *    without trade certification" to avoid Expert ratings on simple tasks.
 *
 * 4. SAFETY SPECIFICITY — original said "list safety precautions". The
 *    new schema and prompt explicitly require specific PPE items and code
 *    references, not vague "be careful" advice.
 *
 * 5. PRO TIPS CAP — original had no limit. Models tend to pad this list.
 *    The schema now specifies 3–5 tips and each tip must include the "why".
 *
 * 6. MACGYVER DISCLAIMER QUALITY — original said "warn about risks".
 *    New instructions require the disclaimer to be project-specific, not
 *    generic boilerplate that users learn to skip.
 *
 * 7. CONTRACTOR TRIGGER — original's criteria were vague. New instructions
 *    specify exact triggers (injury risk, structural failure, code violation,
 *    permit requirement) and require the specific trade to be named.
 *
 * 8. INVENTORY CONTEXT WINDOW — unchanged in structure but now injected as
 *    a TypeScript template literal rather than Handlebars triple-stache.
 */
function buildProjectPrompt(input: ProjectInstructionGeneratorInput): string {
  const { projectDescription, instructionMode, category, subcategory, userInventory } = input;

  const inventorySection = userInventory?.trim()
    ? `USER'S CURRENT INVENTORY:\n${userInventory}\n\nCross-reference every tool and material against this list. Mark matching items as "[In Inventory]".`
    : `USER'S CURRENT INVENTORY: None provided. Assume a basic hand-tool workshop with no power tools.`;

  const modeSection =
    instructionMode === 'macgyver'
      ? `### MacGyver Mode — Resourceful Improvisation
Your goal is to solve this using the user's existing inventory first. Only suggest purchasing items that are truly unavoidable.

Rules for MacGyver mode:
1. INVENTORY FIRST: If the user's inventory can solve this, use it. Adapt tools creatively (e.g. a paint stirrer as a mixing paddle).
2. COMMON HOMESTEAD FALLBACKS: If inventory is empty or insufficient, suggest items found on most homesteads before store-bought alternatives (baling wire, scrap lumber, mason jars, hardware cloth).
3. RISK GATE: If the improvised solution involves a real risk of injury, structural failure, permit violation, or contamination (e.g. improvising electrical connections, waterproofing a load-bearing structure), you MUST populate contractorRecommendation with the specific trade to hire, and the disclaimer must call out the specific risk — not generic boilerplate.`
      : `### By-The-Book Mode — Standard Best Practices
Provide instructions that follow current building codes, manufacturer specifications, and established safety standards.

Reference specific standards where applicable:
- Electrical: NEC (NFPA 70) code references
- Plumbing: local IPC/UPC compliance
- Structural: span tables, load requirements
- Food safety: USDA or Ball Blue Book guidelines for canning/preservation`;

  const subcategoryContext = getSubcategoryContext(subcategory);

  return `You are Rootstock, a Master Tradesperson and Homesteading Expert with decades of hands-on experience across carpentry, plumbing, electrical, agriculture, food preservation, and general self-sufficiency.

PROJECT: "${projectDescription}"
CATEGORY: ${category ?? 'General'}
SUBCATEGORY: ${subcategory ?? 'General'}

${subcategoryContext}

${modeSection}

### Universal Standards (apply in all modes):

TOOLS: For every task that can be done with either a hand tool OR a power tool, list BOTH options separated by " or " (e.g. "Hand saw or Circular saw", "Manual bit-brace or Power drill"). This respects users without grid power, those building hand-tool skills, and those who prefer one approach.

STEPS: Target 5–12 steps. Each step should be 2–4 sentences. For critical actions, include the *why* (e.g. "Torque the lag screws to 20 ft-lbs — under-tightening causes racking under load"). Avoid single-sentence steps and avoid combining multiple distinct actions into one step.

DIFFICULTY: Calibrate to a motivated homesteader without trade certification. "Beginner" = anyone can do it their first time. "Expert" = requires prior trade experience or specialised equipment.

PRO TIPS: Include 3–5 tips maximum. Each must explain why the tip matters, not just what to do.

${inventorySection}`;
}


// ── Flow ──────────────────────────────────────────────────────────────────

async function runGeneration(
  input: ProjectInstructionGeneratorInput,
  model: Parameters<typeof generateObject>[0]['model'],
): Promise<ProjectInstructionGeneratorOutput> {
  const { object } = await generateObject({
    model,
    schema: ProjectInstructionGeneratorOutputSchema,
    messages: [
      {
        role: 'user',
        content: buildProjectPrompt(input),
      },
    ],
  });

  // Enforce: byTheBook mode should never have a disclaimer
  if (input.instructionMode === 'byTheBook') {
    object.disclaimer = undefined;
  }

  return object;
}

export async function generateProjectInstructions(
  input: ProjectInstructionGeneratorInput,
): Promise<ProjectInstructionGeneratorOutput> {
  return withFallback(
    () => runGeneration(input, scout),
    () => runGeneration(input, geminiFlashLite),
    'generate-instructions',
  );
}
