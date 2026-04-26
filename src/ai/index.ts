/**
 * Public API for all AI flows.
 *
 * Named exports mirror the original Genkit flow function names so existing
 * page imports need only update the import path, not the function names.
 *
 * Old:  import { detectInventoryItems }     from '@/ai/flows/detect-inventory-item-flow'
 * New:  import { detectInventoryItems }     from '@/ai/flows/detect-inventory-item'
 *        — or —
 *       import { detectInventoryItems }     from '@/ai'
 */

export { detectInventoryItems }           from './flows/detect-inventory-item';
export type { DetectInventoryItemInput,
              DetectInventoryItemOutput }  from './flows/detect-inventory-item';

export { enhancePhoto }                   from './flows/enhance-image';
export type { EnhancePhotoInput,
              EnhancePhotoOutput }        from './flows/enhance-image';

export { generateProjectInstructions }    from './flows/generate-project-instructions';
export type { ProjectInstructionGeneratorInput,
              ProjectInstructionGeneratorOutput } from './flows/generate-project-instructions';

export { clarifyProjectStep }             from './flows/clarify-step';
export type { StepClarificationInput,
              StepClarificationOutput }   from './flows/clarify-step';
