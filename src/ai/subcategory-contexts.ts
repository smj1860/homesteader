/**
 * Subcategory-specific prompt context blocks.
 *
 * Each entry is injected into the project instruction generator prompt to
 * give the model explicit domain anchors — vocabulary, standards, safety
 * focus, and step patterns — rather than forcing it to infer them from
 * just a label like "Pressure canning".
 *
 * Keys match the subcategory strings defined in src/app/projects/page.tsx
 * exactly (case-sensitive). Update both files if subcategory names change.
 */
export const subcategoryContexts: Record<string, string> = {

  // ─────────────────────────────────────────────────────────────────────────
  // LANDSCAPING & GARDENING
  // ─────────────────────────────────────────────────────────────────────────

  'Raised bed & container gardens': `
DOMAIN EXPERTISE — Raised Beds & Container Gardens:
Standards: Reference your USDA hardiness zone, last/first frost dates, and square-foot gardening spacing guides (Mel Bartholomew method) where applicable.
Terminology: growing medium, Mel's Mix (peat/vermiculite/compost ratio), drainage layer, wicking bed, self-watering reservoir, companion planting, nitrogen fixers, hardening off, transplant shock, root-bound.
Safety: Pressure-treated lumber before 2003 may contain arsenic-based CCA preservative — specify untreated cedar, redwood, or modern ACQ/CA-B treated wood rated for food-contact applications.
Typical step pattern: Site selection (sun/drainage) → determine size & depth (12" min for most vegetables, 18"+ for root crops) → build/assemble frame → line sides if needed → fill with amended growing medium → plan layout → plant/seed → mulch → set up irrigation.
Pro tip focus: Soil mix ratios, drainage failures, liner materials, depth requirements by crop type, preventing compaction in no-till beds.`,

  'Soil & composting': `
DOMAIN EXPERTISE — Soil & Composting:
Standards: Reference USDA NRCS soil health principles, Cornell Composting guides, and OMRI (Organic Materials Review Institute) listing for certified inputs where relevant.
Terminology: C:N ratio (carbon-to-nitrogen), hot compost (thermophilic), cold compost (mesophilic), vermicomposting, humus, soil food web, mycorrhizae, cation exchange capacity (CEC), pH, macronutrients (NPK), micronutrients, biochar, cover crop, green manure, soil tilth, clay/silt/sand texture triangle.
Safety: Hot compost piles can reach 160°F+ — use a fork when turning, warn about steam burns and pathogen kill temperatures (131°F+ for 3 days minimum for weed seed and pathogen death).
Typical step pattern: Test existing soil (pH, NPK, texture) → identify amendments needed → source materials → layer or incorporate amendments → till or no-till integrate → water to field capacity → retest after 4–6 weeks if needed.
Pro tip focus: C:N ratios for fast decomposition, turning frequency, moisture management ("wrung-out sponge" test), recognizing pile failure (anaerobic smell), when to use compost vs fertilizer.`,

  'Irrigation & watering systems': `
DOMAIN EXPERTISE — Irrigation & Watering Systems:
Standards: Reference local water authority regulations for backflow prevention (required in most jurisdictions for any irrigation connected to potable supply). Reference Irrigation Association best practices.
Terminology: drip emitter, micro-spray, soaker hose, header line, lateral line, pressure regulator, filter/strainer, backflow preventer (atmospheric vacuum breaker vs pressure vacuum breaker), flow rate (GPH/GPM), operating pressure (PSI), head loss, zone, timer/controller, fertigation.
Safety: All irrigation systems connected to a potable supply require a backflow preventer — cross-contamination of drinking water is a real risk without one. Note local permit requirements for new in-ground systems.
Typical step pattern: Map beds and water source → calculate flow rate and pressure → design zone layout → install main line → install pressure regulator and filter → run lateral lines → install emitters → test and adjust → set timer schedule.
Pro tip focus: Pressure regulation for emitters (drip runs best at 8–15 PSI), flushing lines seasonally, timer placement for morning watering to reduce fungal disease, calculating total flow per zone against supply capacity.`,

  'Fruit trees & food forests': `
DOMAIN EXPERTISE — Fruit Trees & Food Forests:
Standards: Reference your local university extension service for variety selection, spray schedules, and rootstock guides. Permaculture Research Institute and Martin Crawford's "Creating a Forest Garden" for polyculture design.
Terminology: rootstock (dwarfing vs semi-dwarf vs standard), scion, grafting (whip-and-tongue, cleft, bark graft), chilling hours, bloom time, pollination group, guild planting, canopy layer (7 layers), pruning cuts (heading vs thinning), fire blight, codling moth, dormant oil spray, scaffold branches.
Safety: Pruning from ladders on uneven ground is a leading cause of farm injuries — specify ladder placement, stabilization, and fall hazard assessment. Dormant oil and copper sprays require respiratory PPE.
Typical step pattern: Select varieties for climate/chilling hours → source bare root or container stock → site selection (sun, air drainage for frost, soil drainage) → dig hole (2× width, same depth as root flare) → plant at correct depth (graft union above soil) → stake if needed → mulch ring → prune for structure → irrigation setup.
Pro tip focus: Not planting too deep (most common fatal mistake), graft union placement, selecting pollinators, timing of dormant pruning vs summer pruning, why heading cuts force vigor.`,

  'Pest & weed control': `
DOMAIN EXPERTISE — Pest & Weed Control:
Standards: Reference EPA label requirements for any pesticide application — the label is the law. Reference IPM (Integrated Pest Management) principles from your state's extension service.
Terminology: IPM (integrated pest management), economic threshold, beneficial insects, systemic vs contact pesticide, pre-emergent vs post-emergent herbicide, row cover, kaolin clay, neem (azadirachtin), Bt (Bacillus thuringiensis) strains, OMRI certification, PHI (pre-harvest interval), REI (re-entry interval).
Safety: The label is legally binding — specify PPE required per the label (often Nitrile gloves minimum, eye protection, respirator for concentrates). Never exceed label rate. Observe PHI before harvest. Dispose of rinsate legally.
Typical step pattern: Identify pest/weed correctly (misidentification leads to wrong treatment) → assess damage level vs economic threshold → choose least-toxic effective method → apply at right timing (pest lifecycle) → document → reassess in 7–14 days.
Pro tip focus: Why ID must come before treatment, beneficial insect collateral damage, resistance management (rotating modes of action), why hand-pulling weeds before seed set beats any herbicide.`,

  'Greenhouse & cold frames': `
DOMAIN EXPERTISE — Greenhouse & Cold Frames:
Standards: Check local zoning for structure setbacks and whether a permit is required (permanent structures typically require one). Reference ASHRAE ventilation guidelines for greenhouse design.
Terminology: glazing (polycarbonate vs tempered glass vs polyfilm), R-value, thermal mass, passive solar design, ventilation area (minimum 20% of floor area), ridge vent, HAF (horizontal airflow) fan, humidity management, condensation, cold frame, hotbed, season extension, hardening off, damping off.
Safety: Polycarbonate panels can shatter under impact — use safety glasses during cutting and installation. Anchor structure against wind uplift (greenhouse sail area is enormous). Electrical in wet environments requires GFCIs and weatherproof enclosures.
Typical step pattern: Design/select structure → check permits → prepare site (level, drainage) → pour or build foundation → frame or assemble structure → install glazing → set up ventilation → install heating if needed → install grow benches → set up irrigation/watering.
Pro tip focus: Ventilation sizing (overheating kills plants faster than cold), condensation drip management, thermal mass placement for passive heat retention, UV-stabilized vs non-UV-stabilized poly film lifespan.`,

  'Lawn care & pasture': `
DOMAIN EXPERTISE — Lawn Care & Pasture:
Standards: Reference your state's university extension service for grass species selection, seeding rates, and fertilizer timing. NRCS Technical Note Plant Materials for native pasture species.
Terminology: cool-season vs warm-season grasses, overseeding, dethatching, aeration (core vs spike), topdressing, soil test, lime application (calcitic vs dolomitic), rotational grazing, stocking rate (AUM — Animal Unit Month), carrying capacity, paddock design, forage yield.
Safety: Lime dust is an eye and respiratory irritant — require eye protection and dust mask when spreading. Tractor and implement PTO safety — keep shields in place, shut down before unclogging.
Typical step pattern: Soil test → address pH (lime if needed) → address drainage or compaction → select species for climate/use → prep seedbed or overseed into existing stand → seed at correct rate and timing → roll/pack for seed contact → fertilize at establishment → mow or graze management.
Pro tip focus: Why soil test before any inputs (pH dictates nutrient availability), core aeration timing, overseeding into living sod technique, rotational grazing rest periods.`,

  'Seed saving & propagation': `
DOMAIN EXPERTISE — Seed Saving & Propagation:
Standards: Reference Seed Savers Exchange guides and Carol Deppe's "Breed Your Own Vegetable Varieties" for open-pollinated selection. Check USDA/CFIA regulations on propagating patented or PVP-protected varieties.
Terminology: open-pollinated (OP) vs hybrid (F1), heirloom, isolation distance, roguing (removing off-types), wet processing (tomato/cucumber) vs dry processing, germination rate, viability testing, stratification, scarification, hardwood vs softwood cutting, air layering, division, tissue culture.
Safety: Wet seed processing creates mold risk — process in ventilated area and dry seeds rapidly to below 8% moisture to prevent mycotoxin development.
Typical step pattern: Select best specimens for seed (not just best eating) → allow to reach full seed maturity (past eating stage) → harvest seed → clean/process by type (wet vs dry) → dry thoroughly → test germination → store in cool/dark/dry conditions → label with variety, source, year.
Pro tip focus: Isolation distances by species, the difference between "ripe for eating" and "mature for seed," moisture content for storage, silica gel use in humid climates, why never save seed from F1 hybrids.`,

  // ─────────────────────────────────────────────────────────────────────────
  // COOKING & BAKING
  // ─────────────────────────────────────────────────────────────────────────

  'Cast iron & wood stove cooking': `
DOMAIN EXPERTISE — Cast Iron & Wood Stove Cooking:
Standards: Reference cast iron care guides from Lodge Manufacturing and Griswold collectors for seasoning chemistry. Wood stove safety per NFPA 211 and manufacturer clearances.
Terminology: seasoning (polymerization), carbon steel vs cast iron, heat retention vs heat responsiveness, hot spot management, firebox temperature, damper, flue draft, BTU output, Dutch oven, camp oven lid technique, coals vs live flame for baking, oven temp estimation.
Safety: Cast iron handles reach the same temperature as the cooking surface — specify appropriate gloves (oven mitts fail; use silicone or leather). Wood stove clearances to combustibles must be maintained per installation specs.
Typical step pattern (seasoning): Strip to bare metal if needed → wash and dry completely → apply thin oil layer → bake upside down at 450–500°F for 1 hour → cool in oven → repeat 3–4 times.
Pro tip focus: Why thin oil coats beat thick ones (sticky polymerization failure), pre-heating cast iron before adding fat, reading wood stove temps by hand (2-second 6-inch hover), why reactive foods (tomatoes, citrus) strip seasoning.`,

  'Bread & sourdough baking': `
DOMAIN EXPERTISE — Bread & Sourdough Baking:
Standards: Reference Peter Reinhart's "Artisan Breads Every Day," Tartine Bread for sourdough, and King Arthur Flour guides for formula percentages.
Terminology: baker's percentages, autolyse, bulk fermentation, preferment (poolish, biga, levain), stretch and fold, windowpane test, shaping (boule vs bâtard), bench rest, proofing, scoring, oven spring, crumb structure, crust Maillard reaction, hydration percentage, gluten development.
Safety: Steam injection in home ovens creates burn risk — specify safe pan technique and oven mitt requirements. Lame scoring blades are razor-sharp; handle with care.
Typical step pattern: Mix levain/preferment → autolyse flour and water → add starter/yeast and salt → bulk ferment with folds → pre-shape → bench rest → final shape → proof (cold retard or room temp) → score → bake with steam → cool completely before cutting.
Pro tip focus: Why cutting warm bread destroys crumb structure, levain float test, windowpane test for gluten development, reading when bulk fermentation is complete (50–75% volume increase for sourdough), Dutch oven as steam chamber substitute.`,

  'Fermentation & cultures': `
DOMAIN EXPERTISE — Fermentation & Cultures:
Standards: Reference Sandor Katz's "The Art of Fermentation," USDA fermented foods guidelines, and FDA Food Code for commercial-scale operations.
Terminology: lacto-fermentation, brine percentage (by weight), Lactobacillus, active vs passive fermentation, airlock, SCOBY (symbiotic culture of bacteria and yeast), acetobacter, kefir grains, whey, titratable acidity, pH (food-safe target <4.6), kahm yeast (normal surface yeast vs mold), anaerobic environment.
Safety: pH below 4.6 inhibits Clostridium botulinum — for any vegetable ferment, achieving and verifying this pH is the food safety target. Distinguish kahm yeast (harmless white film) from mold (fuzzy, colored) — mold contamination requires discarding the batch.
Typical step pattern: Sterilize equipment → prepare brine/culture → prepare vegetables/substrate → pack into vessel → add brine/culture to submerge ingredients → weigh down below brine → cover with airlock or cloth → ferment at correct temperature → taste-test for acidity → transfer to cold storage to slow fermentation.
Pro tip focus: Why anaerobic environment is non-negotiable, salt percentage by weight not volume, temperature's effect on speed and flavor, using pH strips vs taste for safety verification.`,

  'Outdoor & open-fire cooking': `
DOMAIN EXPERTISE — Outdoor & Open-Fire Cooking:
Standards: Reference USDA safe internal temperatures for all proteins. Open fire cooking in most jurisdictions requires checking local burn bans and setback requirements.
Terminology: hardwood vs softwood (resinous softwoods give off-flavors), coal bed management, Dutch oven coal counting (top-to-bottom ratio for bake vs simmer), tripod vs crane setup, fire ring construction, reflector oven, pit cooking (imu/horno), ambient temperature effect on cooking times, carry-over cooking.
Safety: Keep a water or sand source within arm's reach of any open fire. Never cook over treated wood, painted wood, or trash — chemical off-gassing is toxic. Carbon monoxide from any combustion — never cook in enclosed spaces.
Typical step pattern: Site selection (level, away from structures and overhead branches, legal) → build fire ring if needed → build fire with appropriate wood → develop coal bed (hardwood; 45–60 min to good coals) → manage coal bed during cooking → cook with thermometer verification → full fire extinguishment (coals soaked, cold to touch).
Pro tip focus: Coal bed management vs live flame, Dutch oven top vs bottom coal ratios for different results, reverse-sear technique on open fire, why hardwoods produce better coals.`,

  'Dairy — butter, cheese, yogurt': `
DOMAIN EXPERTISE — Dairy Processing:
Standards: Reference USDA Grade A Pasteurized Milk Ordinance (PMO) for food safety temps. Cheesemaking guides by Ricki Carroll ("Home Cheese Making") and New England Cheesemaking Supply.
Terminology: pasteurization (63°C/30min vs 72°C/15sec), mesophilic vs thermophilic cultures, rennet (animal vs vegetable vs microbial), curd and whey, pH at cutting, cheddaring, pressing (PSI and time), brining, aging (affinage), butterfat percentage, separator, cream-on-top vs homogenized, coliform count, pH meter vs litmus test.
Safety: Raw milk carries Listeria, Salmonella, E. coli O157:H7, and Campylobacter risk — if using raw milk, specify legal status in user's state (29 states permit some form of raw milk sales/herdshare) and recommend heightened hygiene protocols. All equipment must reach 180°F sanitization temperature.
Typical step pattern (hard cheese): Heat milk to culture temperature → add culture → incubate → add rennet → cut curd to correct size → cook curd → drain whey → press at increasing PSI → brine → age at correct temp/humidity.
Pro tip focus: Why equipment sanitization beats cleaning, pH vs calendar time for whey drainage, pressing pressure ramp-up schedule, humidity management during aging.`,

  'Meal planning from scratch': `
DOMAIN EXPERTISE — Scratch Meal Planning:
Standards: Reference USDA MyPlate for nutritional balance, Weston A. Price Foundation for traditional foods approach, and root-to-stem cooking principles for waste reduction.
Terminology: mise en place, batch cooking, larder, pantry staples rotation (FIFO), unit cost per meal, freezer inventory, nutrient density, protein complementarity (for plant-based), rendering, stock/broth from scraps, lacto-fermented condiments, soaking/sprouting for legume digestibility.
Safety: Safe food storage temperatures (below 40°F or above 140°F — the danger zone), proper cooling of large batches (shallow containers, ice bath to pass through 70°F within 2 hours), raw meat handling cross-contamination prevention.
Typical step pattern: Audit pantry and freezer → plan meals around what's on hand and seasonal produce → create master shopping list for gaps → batch cook components (grains, beans, stocks, roasted veg) → portion and store → prep for the week.
Pro tip focus: Building a "capsule pantry" of versatile staples, FIFO rotation to eliminate waste, batch cooking economics (energy and time), planning meals around protein versatility.`,

  'Dehydrating & drying food': `
DOMAIN EXPERTISE — Dehydrating & Food Drying:
Standards: Reference USDA Complete Guide to Home Canning Appendix on drying, and the National Center for Home Food Preservation for specific products. Jerky requires reaching 160°F internal before or after dehydration per USDA 2009 guidance.
Terminology: water activity (aw), target moisture content (<10% for vegetables, <15% for fruit), conditioning (equalizing moisture), pre-treatment (blanching to inactivate enzymes; sulfite dip for color; ascorbic acid), case hardening, rehydration ratio, leatherlike vs brittle doneness test, sun drying vs dehydrator vs freeze-drying.
Safety: Jerky food safety — USDA updated guidance in 2009 requiring 160°F internal temp; reaching this in a dehydrator set to 160°F is not sufficient for most cuts. Specify the heat-before or heat-after method. Mold in stored dried food indicates inadequate drying — the whole batch may be compromised.
Typical step pattern: Wash and prep food → pre-treat if needed → slice to uniform thickness → arrange on trays with airspace → dry at appropriate temperature for product → test for doneness → condition for 7–10 days in sealed jar → check for moisture condensation → store in airtight container.
Pro tip focus: Uniform slice thickness for even drying, conditioning step to catch under-dried pieces before bulk storage, pre-treatment tradeoffs (blanching vs raw), mandoline use for consistent slicing.`,

  // ─────────────────────────────────────────────────────────────────────────
  // CANNING
  // ─────────────────────────────────────────────────────────────────────────

  'Water bath canning': `
DOMAIN EXPERTISE — Water Bath Canning:
Standards: Follow USDA Complete Guide to Home Canning and/or the Ball Blue Book (current edition). Processing times and acidity levels are scientifically tested — never improvise or shorten times.
Terminology: water bath canner (BWB), high-acid foods (pH <4.6), headspace, processing time, altitude adjustment (add 1 min per 1,000 ft above 1,000 ft for 10-min+ processes), seal check, false seal, botulism (pH >4.6 creates risk), ascorbic acid (anti-browning), hot pack vs raw pack.
Safety: Water bath canning is only safe for high-acid foods (pH < 4.6) — tomatoes, fruit, pickles, jams. Low-acid vegetables, meat, and beans MUST use pressure canning. Never use old USDA recipes or untested recipes from the internet that aren't from NCHFP or Ball.
Typical step pattern: Prepare jars (wash, inspect for chips, keep hot) → prepare food per tested recipe → fill jars with correct headspace → remove air bubbles → wipe rims → apply lids finger-tight → lower into boiling water (1–2" above lids) → process for altitude-adjusted time → remove and rest 12–24 hours without touching → check seals → store unsealed jars in refrigerator.
Pro tip focus: Why adjusting for altitude matters (lower boiling point = less heat penetration), jar-rim cleanliness for reliable seals, why overtightening bands prevents sealing, 24-hour rest before seal check.`,

  'Pressure canning': `
DOMAIN EXPERTISE — Pressure Canning:
Standards: Follow USDA Complete Guide to Home Canning exclusively — processing times are the result of penetration heat studies and are non-negotiable. Ball Blue Book is acceptable secondary reference. NEVER use open-kettle method (USDA withdrew approval 1989).
Terminology: dial gauge vs weighted gauge canner, PSI (10 lb vs 15 lb), altitude adjustment (above 2,000 ft: weighted gauge users must use 15 lb weight; dial gauge users add 1 PSI per 2,000 ft), venting (exhaust steam for 10 min before pressurizing), natural pressure release, low-acid foods, headspace, Clostridium botulinum, thermal death time.
Safety: Botulism from improperly pressure-canned low-acid foods is odorless and tasteless and causes fatal paralysis — this is the highest food safety risk in home preservation. Dial gauges must be tested annually at a local extension office for accuracy. Do NOT attempt to rush pressure release (cold water bath on canner causes seal failure and dangerous steam events).
Typical step pattern: Vent canner for 10 full minutes of steady steam → add weight or close petcock → bring to target PSI → start timing → maintain pressure throughout (adjust heat) → turn off heat → natural pressure release until pressure reads zero → wait 10 more minutes → open lid away from face → remove jars without tilting.
Pro tip focus: Why 10-minute vent is non-negotiable (removes air pockets that cause under-processing), dial gauge calibration schedule, recognizing proper seal vs false seal, why dense foods (purées, refried beans) have separate processing requirements.`,

  'Pickling & brining': `
DOMAIN EXPERTISE — Pickling & Brining:
Standards: Reference USDA Complete Guide and NCHFP tested recipes for shelf-stable pickles. Use only tested recipes — vinegar acidity (minimum 5% acidity), salt percentage, and produce-to-brine ratios are all part of the safety calculation.
Terminology: quick pickle vs fermented pickle (lacto-fermentation), brine percentage (by weight), vinegar acidity (5% minimum for canning safety), calcium chloride (Pickle Crisp), alum (no longer recommended), tannin sources for crunch (grape leaf, oak leaf, horseradish leaf), pickling salt vs kosher salt vs table salt (iodine inhibits fermentation).
Safety: For shelf-stable pickles, vinegar must be at least 5% acidity — do not reduce vinegar or increase water beyond the tested recipe. Diluting the brine drops pH into the danger zone.
Typical step pattern: Select correct variety (pickling cucumbers vs slicers have different cell structure) → slice/prepare → make brine (vinegar + water + salt at correct ratio) → pack jars tightly → pour hot brine with correct headspace → water bath process per tested recipe.
Pro tip focus: Blossom-end removal for crisper pickles, pickling salt vs table salt chemistry, why fresh-pack vs fermented require completely different techniques, crunch-preservation methods ranked by effectiveness.`,

  'Jams, jellies & preserves': `
DOMAIN EXPERTISE — Jams, Jellies & Preserves:
Standards: Follow Ball Blue Book and NCHFP recipes for safe water bath processing. Use tested recipes for correct pectin-acid-sugar ratios.
Terminology: pectin (liquid vs powdered vs low-sugar), gel point (220°F at sea level, -1°F per 500 ft altitude), sheeting test (spoon test), wrinkle test, natural pectin content by fruit (high: crabapples, currants, quince; low: strawberries, peaches, pears), added acid (lemon juice), set failure, weeping/syneresis, headspace.
Safety: Water bath canning rules apply — 5-minute minimum processing for most jams and jellies. The high sugar content provides additional preservation but does not eliminate the need for proper pH and heat processing for shelf stability.
Typical step pattern: Prepare fruit → measure and prepare pectin and acid → combine and bring to full rolling boil → add sugar → return to full rolling boil → cook to gel point (temp or sheeting test) → skim foam → fill hot jars with headspace → water bath process.
Pro tip focus: Why "full rolling boil that can't be stirred down" matters, gel point vs time-based setting, cold plate wrinkle test for doneness, why pectin and acid are both needed for proper gel structure.`,

  'Freezing & vacuum sealing': `
DOMAIN EXPERTISE — Freezing & Vacuum Sealing:
Standards: Reference USDA FoodKeeper app for recommended freezer storage times by product. FDA food code for safe temperature maintenance.
Terminology: blanching (enzyme inactivation), freezer burn (sublimation), vacuum sealer vs zipper-lock vs chamber sealer, headspace in rigid containers, IQF (individual quick freeze), flash freeze, defrost safely (refrigerator vs cold water vs microwave — never counter), freezer temperature (0°F/-18°C target), BTU draw and cycling of chest vs upright freezer.
Safety: Never refreeze raw meat that has thawed — refreezing cooked product only. Safe thawing methods: refrigerator (safest), cold-water bath (change water every 30 min), microwave (cook immediately after). Never thaw on the counter at room temperature.
Typical step pattern: Blanch vegetables for correct time per type → cool immediately in ice water → drain completely → IQF on sheet pan if desired → pack in correct container with minimal air → label with content and date → freeze at 0°F or below.
Pro tip focus: Why blanching is required for vegetables (but not fruit), IQF technique to prevent clumping, vacuum sealing wet items (freeze first to prevent liquid fouling the seal), chest vs upright freezer efficiency.`,

  'Root cellar & cold storage': `
DOMAIN EXPERTISE — Root Cellar & Cold Storage:
Standards: Reference Mike and Nancy Bubel's "Root Cellaring" (the definitive guide) and USDA preservation guides. Cornell extension publications for regional storage conditions.
Terminology: temperature zones (32–40°F for most root veg; 50–60°F for potatoes/squash), humidity requirements (90–95% for root veg; 60–70% for garlic/onions/squash), ethylene gas (produced by apples/pears — store separately from most produce), dormancy, curing (potatoes, squash, sweet potatoes — essential before storage), sand storage (carrots, beets, parsnips).
Safety: Inspect stored produce weekly — one rotting item can accelerate spoilage of an entire cache. Mold and bacteria in cool storage can produce mycotoxins; discard affected items and clean surrounding area.
Typical step pattern: Assess space temperature and humidity across seasons → insulate and ventilate to reach target conditions → cure produce per type → clean and dry produce → pack in appropriate medium → store with correct spacing for airflow → inspect weekly → remove any spoiled items immediately.
Pro tip focus: Separate storage requirements by produce type (ethylene producers stored away from others), curing durations for different crops, humidity management (wet sand vs dry storage), ventilation for CO2 management.`,

  'Smoking & curing meats': `
DOMAIN EXPERTISE — Smoking & Curing Meats:
Standards: USDA FSIS guidelines on curing and smoking. Morton Salt curing guides. Michael Ruhlman's "Charcuterie" for technique. For shelf-stable cured meats, water activity (<0.92) and nitrite levels must meet USDA HACCP standards.
Terminology: dry cure vs brine cure (wet cure), equilibrium curing, nitrate (#1 pink salt / Instacure #1 for short-cure) vs nitrite (#2 / Instacure #2 for long-cure), water activity, cold smoke (<90°F) vs hot smoke (>200°F), USDA smoke/heat guidelines (poultry to 165°F internal, pork to 145°F), pellicle formation, smoke ring.
Safety: Pink curing salts (sodium nitrite/nitrate) are toxic in high concentrations — measure by weight, never substitute with regular salt. Improperly cured products can harbor C. botulinum. Cold-smoked products that don't reach safe internal temps must be from verified-safe sources (USDA inspected) unless they are also salt/nitrite preserved.
Typical step pattern: Calculate cure by meat weight (equilibrium method) → mix cure → apply evenly to meat → vacuum seal or wrap → refrigerate for calculated cure time (variable by thickness) → rinse → air-dry to form pellicle → smoke to target internal temperature → rest → slice or store.
Pro tip focus: Equilibrium curing vs fixed-ratio advantages, pellicle formation importance for smoke adherence, thermometer placement for accurate internal temp reading, why "smoke time" is irrelevant without internal temp verification.`,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO & EQUIPMENT
  // ─────────────────────────────────────────────────────────────────────────

  'Tractors & farm equipment': `
DOMAIN EXPERTISE — Tractors & Farm Equipment:
Standards: Reference manufacturer's operator manual (always model-specific — never assume specs). OSHA 1928.57 for agricultural equipment rollover protection. ASABE (American Society of Agricultural and Biological Engineers) standards for implements.
Terminology: ROPS (rollover protective structure), PTO (power take-off) — 540 vs 1000 RPM, three-point hitch (Category 0/1/2/3 sizing), implement compatibility, hydraulic flow (GPM) and pressure (PSI), tire pressure (front vs rear ballast), differential lock, live PTO vs independent PTO, drawbar HP vs PTO HP.
Safety: PTO entanglement is the leading cause of agricultural fatality — always disengage PTO and wait for full stop before dismounting or clearing jams. Never wear loose clothing around PTO. ROPS + seatbelt reduces rollover fatality risk by 99%.
Typical step pattern: Consult operator manual for the specific procedure → perform safety check (fluid levels, tire pressure, shields in place) → complete task → post-operation fluid check and greasing per lubrication chart.
Pro tip focus: Why to always consult model-specific manual (tractor specs vary enormously), three-point hitch category matching to implement, PTO shielding inspection, hydraulic oil maintenance intervals.`,

  'ATVs & UTVs': `
DOMAIN EXPERTISE — ATVs & UTVs:
Standards: Reference manufacturer's service manual (model-specific). SVIA (Specialty Vehicle Institute of America) safety standards. ATV Safety Institute guidelines.
Terminology: CVT (continuously variable transmission), belt drive, engine braking, ground clearance, wheelbase vs track width (stability), roll cage (UTV), ROPS certification (SAE J2194), tire bead seating, differential vs limited-slip, trailer tongue weight vs payload capacity.
Safety: ATVs are not intended for passengers on single-rider models — fatal rollovers from weight distribution imbalance are common. UTVs require seatbelts and ROPS for all occupants during use. Helmet is required for all riders.
Typical step pattern: Consult service manual → gather correct tools and fluids → complete service procedure → road test on private property → verify repair before returning to field use.
Pro tip focus: CVT belt inspection intervals (heat cycling causes hidden cracking), tire pressure's dramatic effect on handling, UTV load distribution for stability, when field repair vs shop repair is appropriate.`,

  'Generators & engines': `
DOMAIN EXPERTISE — Generators & Engines:
Standards: Reference manufacturer's service manual. NFPA 110 for standby generator installation. EPA emissions regulations for engine replacement/modification.
Terminology: two-stroke vs four-stroke, OHV (overhead valve), displacement (cc), governor, choke, fuel-to-oil ratio (2-stroke), carburetor (float bowl, main jet, pilot jet), magneto ignition, armature air gap, compression test (psi), valve clearance, load capacity (running vs surge watts), transfer switch.
Safety: Carbon monoxide from any combustion engine — generators must never run indoors, in garages, or within 20 feet of windows or doors. Refuel only when engine is cool. Generator backfeed through an improper transfer switch connection can electrocute utility workers.
Typical step pattern: Diagnose symptom → reference service manual diagnostic tree → test compression and spark first (most common failures) → address fuel system → check valve clearance → test under load.
Pro tip focus: Ethanol fuel degradation in storage (Sta-Bil or ethanol-free fuel for seasonal storage), compression and spark as diagnostic starting points, why generator transfer switches are mandatory for safe grid connection, carburetor cleaning sequence.`,

  'Chainsaws & power tools': `
DOMAIN EXPERTISE — Chainsaws & Power Tools:
Standards: Reference manufacturer's service manual. ANSI B175.1 for chainsaw safety. OSHA 1910.215 for abrasive wheel machinery. ANSI/ISEA standards for PPE.
Terminology: chain pitch and gauge, drive link count, bar length, kickback zone (upper quadrant of bar tip), raker height (depth gauge), file angle (top plate angle vs side plate angle), chain tension (snap test), Oregon vs Carlton filing specs, anti-vibration mounts, PPE: chainsaw chaps (UL listed), face shield, cut-resistant gloves, hearing protection (>85 dB requires protection).
Safety: Chainsaw kickback causes most fatalities — never allow the bar tip kickback zone to contact anything. Wear chainsaw chaps rated for your saw's chain speed. Always use both hands. Eye and ear protection are mandatory.
Typical step pattern (chain sharpening): Check chain tension and bar condition first → file each cutter at correct angle (25°–35° top plate for most chains) → maintain consistent raker height (0.025" below cutter) → check all cutters are equal length → adjust tension → test cut.
Pro tip focus: Bar and chain maintenance as preventive maintenance, kickback zone education before any operation, why a dull chain is more dangerous than a sharp one (causes overforce), filing guide vs freehand accuracy.`,

  'Lawn mowers & tillers': `
DOMAIN EXPERTISE — Lawn Mowers & Tillers:
Standards: Reference manufacturer's service manual. ANSI B71.1 (walk-behind mowers) and B71.4 (riding mowers). OSHA agricultural equipment standards.
Terminology: blade tip speed, blade balance, blade engagement (PTO vs blade brake clutch), tine direction (forward vs counter-rotation), tine pattern, soil prep depth, deck leveling (front-to-back and side-to-side), blade sharpening angle (30°–35°), mulching vs bagging vs side-discharge.
Safety: Disconnect spark plug before working on mower blade — engine can fire from blade rotation. Tillers can catch on buried roots and "rope-climb" — maintain firm grip and correct technique for reverse-rotation models. Eye protection mandatory for any mowing — projectile risk.
Typical step pattern (blade service): Disconnect spark plug → tip mower fuel-side up (not air filter side) → remove blade bolt (usually LH thread — lefty-tighty) → inspect blade for cracks, balance, and edge → sharpen to 30° → balance on cone or nail → reinstall at correct torque.
Pro tip focus: Why blade balance matters as much as sharpness, deck leveling procedure for even cut, tiller soil preparation depth vs speed tradeoff, ethanol fuel storage degradation.`,

  'Trucks & trailers': `
DOMAIN EXPERTISE — Trucks & Trailers:
Standards: Reference manufacturer's towing guide (specific to year/trim/engine — max tow ratings vary significantly). DOT regulations for trailer lighting, brakes, and weight limits. State DMV regulations for trailer registration and license requirements.
Terminology: GVWR (gross vehicle weight rating), GCWR (gross combined weight rating), payload capacity, tongue weight (target: 10–15% of trailer weight), WDH (weight distribution hitch), sway control, brake controller (proportional vs time-delayed), pin weight, 5th-wheel vs gooseneck vs conventional hitch, safety chain crossing (X-pattern).
Safety: Trailer sway is a leading cause of towing fatalities — tongue weight below 10% of trailer weight is the primary cause. Safety chains must be crossed (X-pattern) and attached before every trip. Trailer brakes are required by most state laws above certain trailer weights (typically 3,000 lbs).
Typical step pattern (hitching): Verify hitch ball size matches coupler → position truck → lower coupler onto ball → verify positive engagement (try to lift coupler) → insert pin/lock → attach safety chains in X-pattern → connect electrical → verify all trailer lights → adjust mirrors → verify brake controller.
Pro tip focus: Why tongue weight matters more than total trailer weight, brake controller adjustment, mirror extension requirements, pre-trip inspection checklist.`,

  'Welding & metalwork': `
DOMAIN EXPERTISE — Welding & Metalwork:
Standards: Reference AWS (American Welding Society) D1.1 for structural steel. OSHA 1910.252 for welding, cutting, and brazing safety. Lincoln Electric or Miller welding guides for process-specific parameters.
Terminology: MIG (GMAW) vs TIG (GTAW) vs Stick (SMAW) vs flux-core (FCAW), amperage and wire speed (MIG), shielding gas (75/25 Ar/CO₂ for mild steel; 100% Ar for aluminum), tungsten selection (TIG), rod selection (E6011/E6013/E7018 — position and base metal specific), duty cycle, weld penetration, porosity, undercutting, spatter, pre-heat for thick or high-carbon steel, angle grinder wheel types.
Safety: Welding arc flash causes permanent UV eye damage in seconds — always use correct shade lens (shade 10+ for MIG, 12+ for TIG). Fumes from galvanized metal cause metal fume fever and long-term lung damage — ventilate or use respirator rated for metal fumes (P100 minimum). Fire watch is required for 30 minutes post-welding.
Typical step pattern: Verify material and thickness → select process and filler metal → set parameters (amperage/wire speed) → clean base metal to bare metal (rust and paint cause porosity) → tack weld → weld in sequence to manage distortion → inspect → grind if required.
Pro tip focus: Why base metal cleanliness matters more than machine settings, distortion control via backstep or skip welding, why galvanized steel requires special ventilation, penetration test (bend test) for structural welds.`,

  // ─────────────────────────────────────────────────────────────────────────
  // PLUMBING
  // ─────────────────────────────────────────────────────────────────────────

  'Well systems & pumps': `
DOMAIN EXPERTISE — Well Systems & Pumps:
Standards: Reference NSF/ANSI 61 for drinking water components. Your state's well construction standards (varies significantly by state — check state department of environmental quality). EPA groundwater protection guidelines.
Terminology: submersible vs jet pump (shallow well <25 ft vs deep well), pressure tank (bladder vs captive air), pressure switch (cut-in/cut-out pressure), static water level, drawdown, pump curve (GPM at head), pitless adapter, well cap seal, chlorination (shock treatment), turbidity, coliform testing, GPM flow rate test.
Safety: Electrical connections in a well pit or at a submersible pump drop cable are in a wet environment — all wiring must be rated for submersible applications and GFCI protected. Well shock chlorination requires 50–200 ppm free chlorine — use appropriate PPE (gloves, eye protection).
Typical step pattern: Diagnose symptom (no pressure vs short cycling vs pump not starting) → check pressure tank precharge vs pump switch settings → test pressure switch → pull and inspect pump if electrical checks pass → address water quality issues separately.
Pro tip focus: Pressure tank precharge diagnostic, short-cycling as a tank failure indicator, annual water quality testing schedule, why well chlorination is needed after any repair work, pump curves for sizing replacement.`,

  'Pipe repair & replacement': `
DOMAIN EXPERTISE — Pipe Repair & Replacement:
Standards: Reference IPC (International Plumbing Code) or UPC (Uniform Plumbing Code) per your jurisdiction. NSF/ANSI 61 for potable water pipe materials. Local permit requirements — most pipe replacement requires inspection.
Terminology: Schedule 40 vs Schedule 80 (wall thickness/pressure rating), PVC vs CPVC vs PEX vs copper vs galvanized steel, transition fittings (dielectric union for copper-to-galvanized), PEX expansion vs crimp vs clamp vs push-fit (SharkBite), solder (lead-free for potable water), flux, de-burring, WOG pressure rating, nominal vs OD sizing (PVC vs copper differ), drain slope (1/4" per foot).
Safety: Soldering near combustibles requires flame shield or heat protection cloth. Lead-free solder only for potable water (California also restricts flux). Permit and inspection required for most supply-line replacement — insurance and resale value at risk without permits.
Typical step pattern: Shut off water and drain system → cut out damaged section → deburr/clean pipe ends → select correct fitting type → dry-fit before cementing/soldering → solvent-weld or solder (proper heat management) → pressure test before closing wall.
Pro tip focus: Dielectric unions for dissimilar metal joints, pipe sizing for flow (don't upsize without considering velocity), PEX expansion vs crimp long-term reliability comparison, why drain slope matters (too much slope causes solids to be left behind).`,

  'Water heater install & repair': `
DOMAIN EXPERTISE — Water Heater Install & Repair:
Standards: Reference manufacturer installation manual. IPC/UPC plumbing code. NFPA 54 for gas appliances. Local permit requirements — water heater replacement usually requires permit and inspection in most jurisdictions.
Terminology: T&P (temperature and pressure) relief valve, expansion tank, seismic strapping (required in earthquake zones), dielectric nipples, sacrificial anode rod (magnesium vs aluminum), first-hour rating (FHR), recovery rate, standby losses, tankless (demand) vs storage, gas train (thermocouple, thermopile, gas valve), dip tube, sediment flush.
Safety: T&P relief valve is the primary safety device — never cap, plug, or remove. Without it, a failed thermostat can cause catastrophic pressure vessel rupture. Seismic strapping is required by code in many states and is a life-safety item. Gas water heater: verify combustion air supply and proper venting before lighting.
Typical step pattern: Shut off fuel/power and cold water supply → drain tank → disconnect old unit → install expansion tank if required by code → install new unit per manufacturer spec → connect supply and return with dielectric nipples → install T&P relief valve with drain line to floor → reconnect fuel/power → purge air → test T&P valve operation.
Pro tip focus: Expansion tank requirement with check valves in supply (building code increasingly requires), anode rod inspection at 3–5 year intervals, sediment flush annually for hard water, why T&P discharge pipe must terminate 6" above floor.`,

  'Irrigation & outdoor water lines': `
DOMAIN EXPERTISE — Outdoor Irrigation & Water Lines:
Standards: Reference local water authority for backflow preventer requirements (required on any irrigation system connected to potable supply). Local frost depth for burial depth of supply lines.
Terminology: backflow preventer (atmospheric vacuum breaker vs pressure vacuum breaker vs reduced-pressure zone device), frost depth (local code), winterization (blow-out vs gravity drain vs self-draining), Schedule 40 PVC (pressure-rated) vs thin-wall irrigation pipe, head-to-head coverage, precipitation rate, matched precipitation rate nozzles, controller zones and run time.
Safety: Any irrigation connected to potable supply requires backflow prevention by code — protecting the drinking water supply from contamination by fertilizer, pesticide, or soil bacteria. Check local code for required type.
Typical step pattern: Design system (head layout, zone sizing, GPM per zone vs supply capacity) → pull permit if required → dig trenches to frost depth → run mainline → install backflow preventer and valves → run laterals → install heads at correct height → connect controller → test all zones → winterize system before first freeze.
Pro tip focus: Backflow preventer type matched to application, precipitation rate matching between zones for uniform coverage, winterization method by system design, zone flow calculation to avoid exceeding supply capacity.`,

  'Septic & greywater systems': `
DOMAIN EXPERTISE — Septic & Greywater Systems:
Standards: State and local health department regulations govern all septic work — most require licensed septic installer for any new system or major repair. EPA 625-R-04-108 "Onsite Wastewater Treatment Systems Manual." State greywater codes vary enormously (California Title 22, Arizona, etc.).
Terminology: primary treatment (septic tank), secondary treatment (drainfield/leachfield), perc test (percolation test), soil absorption rate, setback requirements (from wells, property lines, waterways), effluent, D-box (distribution box), leachfield, mound system, greywater (laundry/sink/shower — not toilet), blackwater, surge capacity.
Safety: Raw sewage contains pathogens (E. coli, Hepatitis A, Norovirus) — full PPE (gloves, eye protection, boots) for any septic work. Never enter a septic tank without confined space equipment and gas monitoring — hydrogen sulfide is immediately lethal, CO2 accumulates.
Typical step pattern: Assess system by mapping tank and field location → pump tank and inspect inlet/outlet baffles and tees → inspect D-box distribution → probe drainfield for saturation → address specific failure mode found.
Pro tip focus: Why pumping alone doesn't fix a failed drainfield, D-box distribution imbalance as common failure cause, greywater system permitting reality check, setback requirements as non-negotiable.`,

  'Rainwater harvesting': `
DOMAIN EXPERTISE — Rainwater Harvesting:
Standards: State-specific regulations — many states have specific laws governing collection volume and use (Colorado only recently legalized residential collection; Texas actively incentivizes it). Reference your state water law. Texas A&M AgriLife Extension has excellent system design guides.
Terminology: catchment area, roof runoff coefficient (0.9 for metal roofs, 0.8 for asphalt shingle), first-flush diverter (discards first 1-gallon per 100 sq ft of roof), primary filter, secondary filter, storage capacity calculation, cistern vs IBC tote vs rain barrel, overflow management, mosquito prevention, potable vs non-potable use, UV sterilization, slow sand filter.
Safety: Roof runoff from asphalt shingles or treated wood may contain heavy metals, biocides, or organic compounds not safe for potable use without extensive treatment. Stored water must be sealed against mosquito breeding (West Nile, dengue vector). Standing water in tanks creates Legionella risk if water stagnates above 20°C.
Typical step pattern: Check state law → calculate catchment area and expected yield → design storage sizing → install first-flush diverter → install gutters/downspouts → route to storage → install overflow → install filter stages appropriate to use → install extraction pump if needed.
Pro tip focus: First-flush diverter sizing (most critical element), mosquito-proofing all inlets and vents, why catchment surface material affects water quality, overflow management to prevent erosion.`,

  'Fixtures & faucets': `
DOMAIN EXPERTISE — Fixtures & Faucets:
Standards: Reference manufacturer installation instructions (vary significantly). WaterSense certification for water efficiency. Local plumbing code for permit requirements (varies — often no permit required for like-for-like fixture replacement).
Terminology: supply stop valve, compression vs ball vs quarter-turn supply valve, escutcheon, P-trap, slip joint vs compression fitting (drain), ceramic disc cartridge vs ball faucet vs compression valve, packing nut, seat wrench, basin wrench, thread tape (PTFE), pipe dope, shutoff valve replacement (soldering vs SharkBite).
Safety: Always verify water is fully shut off and pressure relieved before disassembling supply connections. Know location of main shutoff before starting any fixture work.
Typical step pattern: Shut off supply stops → open faucet to relieve pressure → disconnect supply lines → remove old fixture → clean mounting surface → install new fixture per manufacturer instructions → connect supply lines (don't overtorque compression fittings — finger-tight plus 1/4 turn) → test for leaks.
Pro tip focus: Why to inspect and often replace supply stop valves during fixture replacement (they seize and fail when needed), basin wrench for under-sink access, thread tape direction, why overtightening compression fittings causes leaks not stops them.`,

  // ─────────────────────────────────────────────────────────────────────────
  // ELECTRICAL
  // ─────────────────────────────────────────────────────────────────────────

  'Panel upgrades & breakers': `
DOMAIN EXPERTISE — Panel Upgrades & Breakers:
Standards: NEC (NFPA 70) current edition, locally adopted. Most panel work requires permit and inspection. In many jurisdictions, only licensed electricians may legally work inside the service panel (check local law).
Terminology: service entrance, main breaker, bus bar (hot vs neutral), grounding electrode system, GEC (grounding electrode conductor), bonding, ampacity, tandem (duplex) breaker, AFCI vs GFCI breaker, panel schedule, available fault current (AFC), interrupting rating, clearance requirements (36" working space, 30" wide, 6'8" headspace per NEC 110.26).
Safety: The conductors entering the main panel from the utility are NOT de-energized by the main breaker — they remain live even with the main breaker off. Only the utility can de-energize service entrance conductors. This is the most dangerous part of any panel work.
Typical step pattern: Check permit requirement → verify working clearance → shut off main breaker → photograph existing wiring before work → complete work per NEC → label new circuits on schedule → schedule inspection before closing panel → restore power after inspection approval.
Pro tip focus: Service entrance wires remaining live with main breaker off, working clearance requirements, why tandem breakers require a panel rated to accept them, AFCI requirement in living spaces per current NEC.`,

  'Outlets, switches & wiring': `
DOMAIN EXPERTISE — Outlets, Switches & Wiring:
Standards: NEC (NFPA 70) current edition. Permit typically required for new circuits; device replacement on existing circuits often doesn't require permit (verify locally).
Terminology: 14 AWG (15A circuit) vs 12 AWG (20A circuit) — never use 14 AWG on a 20A breaker, THHN vs Romex (NM-B) appropriate locations, box fill calculation (cubic inch per conductor), GFCI and AFCI requirements by location (NEC Table 210.8 and 210.12), wire nut vs lever connector (Wago), pigtail vs direct wiring, load calculation.
Safety: Always verify circuit is de-energized with a non-contact voltage tester before touching any wire — even after flipping the breaker (mislabeled panels are common). Aluminum wiring in homes built 1965–1973 requires CO/ALR rated devices and anti-oxidant compound.
Typical step pattern: Identify and verify circuit dead with voltage tester → turn off breaker and tape it → complete wiring work → verify connections are tight and no copper exposed at terminals → install device → restore power → test with outlet tester.
Pro tip focus: Always verify dead with tester (not just trust the breaker label), box fill calculations before adding wires to an existing box, GFCI placement upstream protects all downstream outlets, pigtailing hot bus rather than daisy-chaining for reliability.`,

  'Generator hookups & transfer switches': `
DOMAIN EXPERTISE — Generator Hookups & Transfer Switches:
Standards: NEC Article 702 (Optional Standby Systems). Local permit required for transfer switch installation. Utility notification may be required.
Terminology: manual transfer switch vs automatic transfer switch (ATS), interlock kit (mechanical interlock on main panel), inlet box, 30A vs 50A generator connection, L14-30 vs L14-50 (twist-lock connectors), load shedding, critical circuits, backfeed.
Safety: Backfeed through an improperly connected generator kills utility lineworkers working on "dead" lines during outages. A code-compliant transfer switch or interlock that physically prevents simultaneous utility and generator connection is legally required and a life-safety issue — never use a suicide cord (double-male extension cord).
Typical step pattern: Size generator and determine critical loads → select transfer switch type (interlock vs dedicated switch) → pull permit → install inlet box on exterior → install transfer switch or interlock in panel → wire from inlet to switch to panel → test fail-over and back-transfer → label all components → schedule inspection.
Pro tip focus: Why backfeed danger makes proper interlock non-negotiable, sizing transfer switch to generator output not just panel main, critical load selection (well pump vs sump pump vs refrigeration priority), monthly generator test run.`,

  'Outbuilding & barn wiring': `
DOMAIN EXPERTISE — Outbuilding & Barn Wiring:
Standards: NEC Article 547 (Agricultural Buildings) has specific requirements beyond standard residential wiring. NEC Article 225 for outside branch circuits and feeders. Local permit required.
Terminology: feeder vs branch circuit, sub-panel, separate grounding electrode at outbuilding (required per NEC 225.30), 4-wire feeder (H-H-N-G) to detached building, wet-rated wiring methods (conduit vs UF-B vs underground Type USE), corrosive environment requirements (EMT prohibited, rigid or PVC conduit required per NEC 547), equipotential bonding in stalls.
Safety: NEC 547 specifically addresses the corrosive, wet, dusty environment of agricultural buildings — standard residential wiring methods are not acceptable. Equipotential bonding (connecting all metal in a stall to equalize voltage) is required in livestock areas to prevent stray voltage injury to animals and people.
Typical step pattern: Plan load requirements → size feeder and sub-panel → trench to outbuilding (appropriate depth per wiring method) → install sub-panel with separate grounding electrode → run NEC 547-compliant wiring in corrosion-resistant conduit → install weatherproof GFCI devices → test and label.
Pro tip focus: Why NEC 547 applies and what it changes from standard wiring, four-wire feeder requirement for separate buildings, equipotential bonding for livestock safety, moisture and dust protection levels required.`,

  'Low-voltage & lighting': `
DOMAIN EXPERTISE — Low-Voltage & Lighting:
Standards: NEC Article 411 (Low-Voltage Lighting Systems) and Article 725 (Class 2 and Class 3 Remote-Control Circuits). No permit typically required for Class 2 low-voltage systems (12–24V landscape lighting, LED strips, etc.).
Terminology: Class 2 vs line voltage (120V), TRIAC dimmer vs PWM dimmer (LED compatibility), color temperature (Kelvin — 2700K warm vs 5000K daylight), CRI (color rendering index), lumens vs watts, voltage drop over cable run (12V systems), driver (constant current vs constant voltage), wet vs damp vs dry location rating, photocontrol vs timer vs motion sensor.
Safety: Even low-voltage systems connected to line-voltage transformers require correct wire sizing and proper transformer installation. LED driver compatibility with existing dimmers must be verified — incompatible combinations cause flicker, hum, and premature failure.
Typical step pattern: Calculate lumen requirements → select fixtures with correct location rating → size cable for voltage drop (especially important for 12V runs >50 ft) → install transformer at correct amperage → run cable → connect fixtures → test for flicker/hum → adjust timer/photocontrol.
Pro tip focus: Voltage drop on 12V systems (more significant than 120V), matching LED drivers to dimmers, wet vs damp location distinctions, motion sensor placement for livestock and security applications.`,

  'EV & equipment charging': `
DOMAIN EXPERTISE — EV & Equipment Charging:
Standards: NEC Article 625 (Electric Vehicle Charging Systems). Permit required for all EV charger installations. UL 2594 listing required for EVSE equipment.
Terminology: Level 1 (120V/12–16A) vs Level 2 (240V/16–80A), EVSE (Electric Vehicle Supply Equipment), NEMA 14-50 vs J1772 connector, OCPP (for smart charging), load calculation (charging rate + existing load vs service capacity), demand charge, bi-directional charging (V2H/V2G), dedicated vs shared circuit, conduit fill for future expansion.
Safety: Never install a Level 2 EVSE without a dedicated circuit sized for the EVSE's maximum current plus 20% NEC requirement. Installing on a shared circuit creates overload and fire risk.
Typical step pattern: Assess service capacity (add load calculation) → select EVSE amperage → pull permit → run conduit from panel to garage/parking area (oversize conduit for future) → install dedicated breaker → pull wire → install disconnect if required → mount and connect EVSE → schedule inspection → commission and test.
Pro tip focus: Oversize conduit at installation for future wire upgrades, load calculation requirement (service upgrade may be needed), smart charger scheduling to avoid peak demand charges, weatherproof enclosure requirements for outdoor installations.`,

  // ─────────────────────────────────────────────────────────────────────────
  // RENEWABLE ENERGY
  // ─────────────────────────────────────────────────────────────────────────

  'Solar panel installation': `
DOMAIN EXPERTISE — Solar Panel Installation:
Standards: NEC Article 690 (Solar Photovoltaic Systems). Local permit and electrical inspection required. Utility interconnection agreement required for grid-tied systems. Structural permit may be required for roof-mount.
Terminology: Voc (open-circuit voltage), Isc (short-circuit current), Vmp/Imp (max power point), string sizing, MPPT (maximum power point tracking), series vs parallel string configuration, AHJ (authority having jurisdiction), PV combiner, DC disconnect, rapid shutdown (NEC 690.12 requirement), microinverter vs string inverter vs power optimizer, STC (standard test conditions) vs real-world output.
Safety: PV panels generate voltage whenever exposed to light — they cannot be turned off. Use insulated tools and PPE for all DC wiring work. Rapid shutdown devices (required by NEC 690.12 since 2014) reduce firefighter hazard — all modern grid-tied installations must include them.
Typical step pattern: Site assessment (shade analysis, structural evaluation) → system design (string sizing, inverter selection) → permit application → structural mounting installation → conduit and wire runs → panel mounting and wiring → inverter installation → grounding and bonding → DC and AC disconnects → utility interconnection → inspection → commission.
Pro tip focus: Shade analysis reality (one shaded cell reduces whole string output without optimizers), string sizing math for MPPT voltage window, rapid shutdown requirement, why oversizing arrays relative to inverter (clipping) is often economically optimal.`,

  'Battery banks & storage': `
DOMAIN EXPERTISE — Battery Banks & Energy Storage:
Standards: NEC Article 706 (Energy Storage Systems). NFPA 855 (Installation of Stationary Energy Storage Systems). Local permit required. UL 9540 listing for battery systems.
Terminology: depth of discharge (DoD), cycle life, C-rate (discharge rate relative to capacity), SOC (state of charge), BMS (battery management system), flooded lead-acid vs AGM vs gel vs LiFePO4 vs NMC lithium, series vs parallel battery configuration, battery temperature compensation, equalization charge (flooded LA only), self-discharge rate, round-trip efficiency.
Safety: Hydrogen off-gassing from flooded lead-acid batteries creates explosion risk — require ventilation with H2 sensors for enclosed battery rooms. Lithium batteries require a BMS for cell balancing and thermal runaway prevention. Thermal runaway in lithium batteries can produce toxic gases and is very difficult to extinguish with water.
Typical step pattern: Calculate load requirements → select battery chemistry for use case → size bank (Ah × voltage × DoD factor) → design series/parallel configuration → build bank → configure BMS if lithium → set charge parameters on charger/inverter → test under load.
Pro tip focus: LiFePO4 vs other lithium chemistries for safety-critical applications, why DoD matters for cycle life (LiFePO4 tolerates 80%+ DoD; lead-acid should stay above 50%), BMS as non-optional for lithium, temperature effects on capacity and charging.`,

  'Inverters & charge controllers': `
DOMAIN EXPERTISE — Inverters & Charge Controllers:
Standards: NEC Articles 690 (solar) and 706 (storage). UL 1741 listing required for grid-tied inverters. Permit required for any grid-tied installation.
Terminology: MPPT vs PWM charge controller, charge stages (bulk/absorb/float/equalize), inverter types (pure sine wave vs modified sine wave — modified damages some loads), off-grid vs grid-tied vs grid-tie with backup, transfer time (critical for sensitive loads), surge capacity vs continuous rating, AC coupling vs DC coupling battery backup, Victron vs SMA vs SolarEdge vs Enphase ecosystem differences.
Safety: Modified sine wave inverters can damage equipment with reactive loads (motors, inductive loads, some medical equipment, some battery chargers). Always verify inverter output type before connecting sensitive loads.
Typical step pattern: Determine system topology (off-grid vs grid-tied) → size inverter to peak load plus surge requirement → select MPPT controller sized for array Voc/Isc and battery bank → configure charge parameters per battery spec → wire according to manufacturer diagram → test all modes (solar, battery, grid/generator).
Pro tip focus: MPPT vs PWM efficiency difference (15–30% more harvest with MPPT, especially in cool weather), pure sine wave requirement for motor and inverter-drive loads, transfer time impact on UPS-sensitive loads, charge controller temperature compensation for battery longevity.`,

  'Wind & micro-hydro power': `
DOMAIN EXPERTISE — Wind & Micro-Hydro Power:
Standards: NEC Article 694 (Small Wind Electric Systems) and Article 695 for hydro. AHJ permit required. FAA height restrictions for towers above certain heights. Check wind energy easement laws by state.
Terminology: cut-in wind speed, rated wind speed, Betz limit (59.3% theoretical max extraction), TSR (tip speed ratio), tower height vs wind resource (wind increases with height), head pressure (hydro), flow rate (GPM), Pelton wheel vs Turgo vs crossflow turbine (hydro), penstock, run-of-river vs diversion, turbine furling.
Safety: Wind turbine towers must be properly guyed and have safe climb fall protection — fatal tower falls during installation are documented. Spinning rotor blades at hub height pose decapitation risk. Micro-hydro systems under pressure (penstock) can fail catastrophically if improperly constructed.
Typical step pattern (micro-hydro): Measure site head and flow rate → calculate power potential (Head × Flow × 0.085 × efficiency = watts) → select turbine appropriate to head/flow → size penstock for minimal head loss → install intake and sediment control → run penstock → install turbine and generator → wire to charge controller/inverter.
Pro tip focus: Why turbine selection must match head and flow (not swappable), penstock sizing for head loss calculation, intake screen maintenance as primary maintenance task, comparing wind and hydro resource on the same site.`,

  'Off-grid cabin power systems': `
DOMAIN EXPERTISE — Off-Grid Cabin Power Systems:
Standards: NEC Articles 690, 694, 706 apply to components. Off-grid systems not connected to the utility often have reduced permit requirements (check locally) but should still be built to NEC for safety.
Terminology: load analysis (Wh/day), autonomy days (days of storage without generation), all-in-one inverter-charger, AC vs DC coupling, propane generator as backup, energy budget, phantom loads, power management (load controller), battery SOC monitoring, off-grid vs hybrid system.
Safety: Off-grid systems lack utility grid as backup — system failures have no safety net. Over-discharging batteries shortens life dramatically. Generator backfeed into battery system without proper protection can destroy inverter.
Typical step pattern: Complete load analysis (appliance by appliance, Wh/day) → determine autonomy requirement → size battery bank → size solar/wind/hydro generation → size inverter-charger → design DC and AC distribution → install and commission → establish monitoring routine.
Pro tip focus: Load analysis rigor (phantom loads add up), LED and efficient appliance impact on system sizing and cost, why autonomy days matter in cloudy climates, energy monitoring as ongoing operational necessity.`,

  'Propane & backup fuel systems': `
DOMAIN EXPERTISE — Propane & Backup Fuel Systems:
Standards: NFPA 54 (National Fuel Gas Code) and NFPA 58 (LP Gas Code). Most propane system work requires a licensed LP installer — check state requirements. Tank placement governed by NFPA 58 setback requirements.
Terminology: LP (liquefied petroleum) vs NG (natural gas) — different orifice sizes, pressure regulators, and BTU content, first-stage vs second-stage regulation, lock-up pressure, manifold system, BTU load calculation, tank sizing (gallon vs pound capacity, 80% fill rule), OPD (overfill protection device), vaporization rate (tank size vs draw rate in cold weather).
Safety: Propane is heavier than air and collects in low spots — any propane smell requires evacuating the building and calling the LP supplier, not searching for the source. All indoor gas appliances require adequate combustion air. Never use a gas appliance vented for one fuel type with the other (conversion kit required).
Typical step pattern: Size tank to BTU load and refill interval → confirm NFPA 58 setback compliance for tank placement → installer sets regulators and runs supply lines → pressure test system at 1.5× operating pressure → appliance connections and conversion if needed → leak check with approved solution (not open flame) → commission.
Pro tip focus: Vaporization rate limiting in cold climates (underground tank vs above-ground), NFPA 58 setbacks from ignition sources and structures, why OPD valve is required on all modern tanks, leak testing protocol.`,

  'Energy efficiency & insulation': `
DOMAIN EXPERTISE — Energy Efficiency & Insulation:
Standards: IECC (International Energy Conservation Code) R-value requirements by climate zone. ASHRAE 62.2 for ventilation in tight homes. DOE and Energy Star certification programs.
Terminology: R-value (thermal resistance), U-factor (thermal transmittance — inverse of R), air sealing vs insulation (both required — insulation without air sealing underperforms by 30–50%), thermal bridging, vapor retarder vs vapor barrier, class I/II/III vapor retarder, blower door test (ACH50), attic knee walls, rim joist, thermal envelope, spray foam (open-cell vs closed-cell), blown-in vs batts.
Safety: Spray polyurethane foam is a two-component system — both components are severe respiratory and skin hazards during application. Requires full-face respirator and proper PPE. Fiberglass insulation requires N95 minimum and eye protection.
Typical step pattern: Blower door test to identify leakage pathways → air seal penetrations (top plates, rim joist, electrical boxes, plumbing penetrations) → insulate to code R-value for climate zone → verify ventilation meets ASHRAE 62.2 minimum after tightening → test again.
Pro tip focus: Air sealing before insulation (adding insulation without sealing air is partially wasted effort), rim joist as highest-ROI air sealing target, thermal bridge locations (stud framing at 25% of wall area), blower door test as diagnostic vs code compliance tool.`,

  // ─────────────────────────────────────────────────────────────────────────
  // LIVESTOCK & ANIMALS
  // ─────────────────────────────────────────────────────────────────────────

  'Chickens & poultry': `
DOMAIN EXPERTISE — Chickens & Poultry:
Standards: Reference your state's department of agriculture for flock size permits and sale regulations. NPIP (National Poultry Improvement Plan) certification for interstate movement and sales. Avian influenza biosecurity protocols (USDA APHIS).
Terminology: brooder temperature (95°F week 1, -5°F per week), medicated vs unmedicated chick starter feed, coccidiosis, Marek's disease (vaccination at hatch), pullet vs hen, cockerel vs rooster, clutch, molt, forced molt, egg bloom/cuticle, nest box ratio (1 per 4–5 hens), roost height and spacing (12" per bird), predator apron (L-shaped hardware cloth skirt), deep litter method.
Safety: Avian influenza (HPAI) is a reportable disease — contact your state vet if you observe sudden unexplained flock death. Biosecurity protocol: dedicated footwear for coop entry, visitor restrictions during outbreaks.
Typical step pattern (coop setup): Calculate space requirements (4 sq ft indoors/8–10 sq ft outdoors per bird) → construct or adapt coop → hardware cloth predator protection (not chicken wire — it keeps chickens in but not predators out) → roosts at correct height → nest boxes → ventilation (cross-ventilation without draft) → water and feeder placement → brooder setup if starting chicks.
Pro tip focus: Hardware cloth vs chicken wire for predator security, ventilation without draft distinction, deep litter method vs clean litter tradeoffs, egg bloom preservation and washing implications for storage.`,

  'Goats & sheep': `
DOMAIN EXPERTISE — Goats & Sheep:
Standards: Reference your state's department of agriculture for herd health requirements. USDA scrapie program (sheep/goats require USDA scrapie tags). American Dairy Goat Association and American Sheep Industry for breed standards.
Terminology: doe/buck/wether/kid (goats), ewe/ram/wether/lamb (sheep), FAMACHA scoring (anemia from barber pole worm), fecal egg count (FEC), CIDR (progesterone implant for breeding synchronization), selenium deficiency (goats are selenium-sensitive — regional toxicity vs deficiency varies), ketosis (pregnancy toxemia), CAE (caprine arthritis encephalitis), trace mineral blocks, CDT vaccine (clostridium perfringens C/D + tetanus).
Safety: Buck during rut can be aggressive — have an exit strategy from the pen. Handling chute for goats and sheep reduces injury risk during hoof trimming and treatment.
Typical step pattern (new animal integration): Quarantine for 30 days minimum → health examination → FAMACHA scoring → FEC if high FAMACHA → weight-appropriate parasite treatment if needed → CDT vaccination if not current → introduce gradually to existing herd.
Pro tip focus: FAMACHA and targeted selective treatment vs blanket deworming (resistance management), selenium regional variability (check local extension for your area), CDT annual booster protocol, rotational grazing parasite management.`,

  'Cattle & pigs': `
DOMAIN EXPERTISE — Cattle & Pigs:
Standards: State brand inspection and movement requirements for cattle. USDA APHIS regulations for transport and sale. Local zoning for livestock density. Pork checkoff program requirements for commercial operations.
Terminology: stocker vs feeder vs cow-calf operation, BCS (body condition scoring 1–9), BVD/IBR/PI3/BRSV (respiratory vaccine — "4-way"), blackleg (clostridial), ADG (average daily gain), hanging weight vs live weight, USDA Prime/Choice/Select grading, backgrounding, creep feeding, finishing ration, nose ring (boar management), farrowing crate vs hoop barn.
Safety: Cattle and pig handling requires solid working facilities — squeeze chute for cattle, solid-sided alleyways for pigs. Animals can detect and exploit fear and uncertainty. Always have an escape route in working pens. Pigs are highly intelligent and can be escape artists — fence integrity is critical.
Typical step pattern (processing/harvest planning): Confirm USDA-inspected facility scheduling (required for retail sale) → confirm weight and finish → transport in appropriate trailer with correct bedding → check-in with facility paperwork.
Pro tip focus: BCS scoring for making feeding and culling decisions, low-stress handling principles (Temple Grandin method) for animal and handler safety, USDA inspection requirements for legal sale of meat, hanging weight vs live weight pricing education.`,

  'Rabbits & small animals': `
DOMAIN EXPERTISE — Rabbits & Small Animals:
Standards: USDA APHIS regulations for commercial rabbitries (6+ breeding does requires license). Check state regulations on selling meat and hides. American Rabbit Breeders Association breed standards.
Terminology: doe/buck/kit, kindling, nest box timing (28 days post-breeding), palpation for pregnancy check (12 days), weaning age (4–8 weeks depending on purpose), fryer vs roaster weight targets, GI stasis (rabbit-specific emergency), hutch vs colony housing, fly strike (myiasis), RHDV2 (rabbit hemorrhagic disease virus — emerging in North America), pellet vs hay-based diet.
Safety: GI stasis is a veterinary emergency in rabbits (gut motility stops) — symptoms are lethargy and no fecal output. Fly strike (fly larvae in wounds or moist areas) can be rapidly fatal — inspect daily during warm months.
Typical step pattern (breeding cycle): Bring doe to buck's cage (never reverse — territorial aggression) → record breeding date → palpate at 12 days → provide nest box at day 28 → check nest within 24 hours of kindling → monitor kit growth → wean at appropriate age → record weights and performance data.
Pro tip focus: Why doe always goes to buck's territory, nest box timing and litter survival, fryer weight targets for meat production efficiency, fly strike prevention in warm weather, RHDV2 biosecurity.`,

  'Beekeeping': `
DOMAIN EXPERTISE — Beekeeping:
Standards: State apiary registration (most states require registration of all hives — check your state department of agriculture). Pesticide reporting requirements for pollinator kills. USDA AMS honey grading standards for commercial sale.
Terminology: Apis mellifera, brood (eggs/larvae/pupae), frames (Langstroth vs top-bar vs Warre), super vs brood box, queen (laying vs virgin), drone vs worker, swarm vs split (nucleus colony — nuc), Varroa destructor (primary pest — mandatory monitoring), mite wash/alcohol wash (Varroa monitoring method), IPM for Varroa (OA vapor, Mite-Away, ApiLife), propolis, beeswax foundation.
Safety: Allergy risk — epinephrine auto-injector should be on-site for anyone with history of systemic reaction. Full bee suit with veil is required for beginners. Work hives in the heat of the day when foragers are out. Move slowly and deliberately — sudden movement triggers defensive behavior.
Typical step pattern (inspection): Light smoker → smoke entrance and under cover → open hive from rear or side → remove and inspect frames in sequence → locate queen or evidence of laying queen (eggs, young larvae) → assess brood pattern, stores, Varroa count → reassemble in order → record in inspection log.
Pro tip focus: Varroa as the #1 colony killer — mite wash monitoring monthly from April–November, OA vapor treatment timing (broodless period for highest efficacy), swarm prevention through timely splits, why reading eggs confirms a laying queen better than finding the queen herself.`,

  'Fencing & pasture management': `
DOMAIN EXPERTISE — Fencing & Pasture Management:
Standards: USDA NRCS Practice Standard 382 (Fence) for cost-share programs. High-tensile wire specifications from Gallagher or Premier 1. Local zoning for fence setbacks.
Terminology: high-tensile wire (12.5 gauge) vs woven wire vs barbed wire vs electric fence, energizer (joule output — 1+ joule per mile of wire for livestock), ground system (critical and often underdesigned), line post vs corner post (brace assembly), H-brace vs floating brace, polytape vs polywire vs electrobraid, rotational grazing paddock design, AUM (animal unit month), recovery period.
Safety: Electric fence voltage (5,000–10,000V) can cause involuntary muscle contraction that prevents releasing — ensure all family and farm workers know the system layout. Barbed wire is a significant injury hazard during installation — leather gloves and eye protection required.
Typical step pattern (electric fence): Design paddock layout and gate locations → install corner and end posts with brace assemblies → install line posts → run wire or tape → install energizer with adequate grounding (3 ground rods minimum, 10 ft apart) → test with fence tester (target >4,000V at end of line) → install gates and access.
Pro tip focus: Ground system as the most common electric fence failure point, joule output sizing for vegetation contact, recovery period importance for pasture health, H-brace geometry for corner post integrity.`,

  'Barn & shelter building': `
DOMAIN EXPERTISE — Barn & Shelter Building:
Standards: Local building permits required in most jurisdictions even for agricultural structures above certain square footage. USDA Rural Development design guides. American Institute of Timber Construction span tables.
Terminology: post-frame (pole barn) vs stick-frame vs timber-frame, treated lumber burial class (UC4B for ground contact, UC4C for critical contact), span tables, purlins, girts, trusses (clear span vs support needed), ventilation (ridge vent + eave vents for natural draft), concrete apron, frost depth for footer depth, occupancy load.
Safety: Roof work is the primary fatality risk in barn construction — require fall protection above 6 ft. Post-frame buildings require adequate temporary bracing during construction before permanent bracing is installed — collapse risk without it.
Typical step pattern: Site selection (drainage, sun orientation, prevailing wind for ventilation) → permit application → layout and string lines → dig holes to frost depth → set posts (concrete or compacted gravel footings) → install girts and purlins → frame roof → install roofing → siding → doors → interior fitting.
Pro tip focus: Post depth below frost line, pole/post treatment class for ground contact, ventilation design for livestock health (cross-ventilation minimum, ridge vent preferred), sizing doors for equipment access, concrete apron drainage slope.`,

  'Animal health & first aid': `
DOMAIN EXPERTISE — Animal Health & First Aid:
Standards: Veterinary-client-patient relationship (VCPR) requirement for prescription medications — you must have an established VCPR to obtain prescription drugs. USDA APHIS regulations on animal health certificates for movement. FDA regulations on extra-label drug use (ELDU) in food animals.
Terminology: VCPR (veterinary-client-patient relationship), extra-label drug use (requires vet), withdrawal time (drug to meat/milk interval for food animals), BCS (body condition score), FAMACHA (anemia/parasite scoring), vital signs (species-specific normal ranges), wound care (lavage vs debridement vs closure), bloat (frothy vs free gas — different treatments), colostrum, passive immunity transfer, subcutaneous vs intramuscular vs intravenous injection sites.
Safety: Prescription drugs in food animals have mandatory withdrawal times — using a drug inside its withdrawal window contaminates meat or milk. Keep accurate treatment records for all food animals. Zoonotic disease risk (ringworm, Cryptosporidium, Salmonella, Brucella) — wash hands after all animal contact.
Typical step pattern (wound care): Control bleeding → irrigate thoroughly with clean water or saline (this is the most important step) → assess depth and contamination → determine if veterinary closure is needed → apply appropriate wound care per species and wound type → monitor for infection → adjust care as healing progresses.
Pro tip focus: Lavage as the #1 wound care action (reduces infection more than any topical), withdrawal time record-keeping for food animal drugs, when to call the vet vs treat at home, normal vital sign ranges by species (knowing normal allows recognizing abnormal).`,

  // ─────────────────────────────────────────────────────────────────────────
  // BUILDING & CONSTRUCTION
  // ─────────────────────────────────────────────────────────────────────────

  'Sheds & outbuildings': `
DOMAIN EXPERTISE — Sheds & Outbuildings:
Standards: Local zoning and building codes — shed square footage and height limits vary widely (many jurisdictions allow up to 120–200 sq ft without a permit; larger requires permit). HOA restrictions if applicable. Setback requirements from property lines.
Terminology: concrete deck block vs poured footer vs gravel pad foundation, skid foundation (for movable structures), post-frame vs stick-frame, OSB vs plywood sheathing, drip edge, pre-hung vs build-your-own door, rafter vs manufactured truss, roof pitch (4:12 is common for sheds), vapor barrier under floor framing, pressure-treated for ground contact.
Safety: Floor and wall framing must be properly braced during construction. Roofing falls are the primary injury risk — use appropriate ladder support and consider scaffolding for larger structures.
Typical step pattern: Check permits and setbacks → choose foundation type per site conditions → build/place foundation → frame floor (PT lumber for ground contact) → frame walls → sheathe and brace walls → raise walls and brace temporarily → install roof structure → sheathe roof → install roofing → install doors and windows → siding → paint/seal.
Pro tip focus: Why foundation type is the most important decision (concrete deck blocks vs full footer for frost-heave areas), wall bracing during construction, door rough opening sizing (add 2" to door size), venting for moisture management.`,

  'Fencing & gates': `
DOMAIN EXPERTISE — Fencing & Gates:
Standards: Local zoning fence height limits (typically 4–6 ft residential; agricultural fencing often exempt). Property line surveys before installation (avoid encroaching neighbor disputes). HOA guidelines if applicable.
Terminology: end post vs corner post vs line post, H-brace (for corner loading), post depth (1/3 of total height + 6" minimum; below frost line in freeze-thaw areas), concrete footings vs tamped gravel vs driven post, fence calculator (rails per section, pickets per linear foot), gate hardware (hinges sized to gate weight, drop rod, latch type), plumb vs slight inward lean for corner posts.
Safety: Post-hole digging near buried utilities — call 811 (Dig Safe / 811) before any digging, no exceptions. Post driver operation creates significant impact — hearing protection required.
Typical step pattern: Survey and mark property line → call 811 for utility locates → lay out fence line with stakes and string → dig/drive corner and end posts first → install H-braces → set line posts at appropriate spacing → install rails/stringers → install infill (boards, wire, pickets) → hang gates → check plumb and adjust.
Pro tip focus: Why corner post brace assembly matters (line posts transfer tension to corners; without bracing, corners pull), post depth in freeze-thaw zones (below frost line), gate hinge sizing (undersized hinges sag), 811 utility locate as mandatory step.`,

  'Decks & porches': `
DOMAIN EXPERTISE — Decks & Porches:
Standards: IBC/IRC code compliance required — deck permits are required in virtually all jurisdictions, and unbuilt-to-code decks are a leading cause of collapse injuries. AWC DCA6 (Prescriptive Residential Wood Deck Construction Guide) is the primary reference document adopted by most AHJs.
Terminology: ledger board (and proper waterproofing/attachment to house), beam and joist span tables, post-to-beam connection hardware, joist hanger, rim joist, decking (grooved edge for hidden fasteners vs face screw), Ipe/composite/pressure-treated tradeoffs, railing height (36" under 30" above grade; 42" over 30"), baluster spacing (4" max sphere rule), frost depth for footings.
Safety: Ledger board failure is the most common cause of deck collapse — proper flashing, connection, and lag bolt sizing into rim joist (not sheathing) is critical structural safety. Railing height and baluster spacing are code life-safety requirements, not aesthetic choices.
Typical step pattern: Pull permit → design per span tables for lumber species and grade → dig footings to frost depth → pour concrete and install post bases → set posts → install beam and ledger → install joists with hangers → install decking → install rim and fascia → build stairs (per code rise/run: 7-3/4" max rise, 10" min run) → install railing system → inspection.
Pro tip focus: Ledger board waterproofing as the #1 long-term deck maintenance issue, post-to-beam connection hardware vs toenails (hardware required by most modern codes), decking gap sizing for drainage, hidden fastener systems for cleaner appearance.`,

  'Roofing & gutters': `
DOMAIN EXPERTISE — Roofing & Gutters:
Standards: NRCA (National Roofing Contractors Association) Roofing Manual. ARMA (Asphalt Roofing Manufacturers Association) installation guidelines. Local building code for permit requirements (full re-roof usually requires permit).
Terminology: drip edge (eave vs rake), ice and water shield (required in climate zones with freeze-thaw), underlayment (15# felt vs synthetic), starter strip, shingle exposure, headlap, nail pattern (4 nails vs 6 nails for high-wind), ridge cap vs hip cap, valley treatment (open vs woven vs closed-cut), step flashing, counter-flashing, cricket (behind chimney), gutter sizing (K-style vs half-round, 5" vs 6"), downspout sizing.
Safety: Working on a pitched roof requires fall protection above 6 ft — roof brackets and harness system, or at minimum roof jacks. Never work on a wet or frost-covered roof.
Typical step pattern: Remove existing roofing and inspect sheathing → repair sheathing as needed → install drip edge at eaves → install ice and water shield in vulnerable areas → install underlayment → install drip edge at rakes (over underlayment) → install starter course → install field shingles with correct nail pattern → install step and counter-flashing → install ridge cap → install gutters and downspouts.
Pro tip focus: Ice and water shield requirement by climate zone, nail pattern for wind resistance, step flashing vs continuous apron flashing (step flashing is correct for walls), gutter slope (1/4" per 10 ft), downspout sizing relative to roof area served.`,

  'Framing & foundations': `
DOMAIN EXPERTISE — Framing & Foundations:
Standards: IRC (International Residential Code) for one- and two-family dwellings. AHJ permit and inspection required — framing inspection occurs before sheathing. AWC Wood Frame Construction Manual for high-wind or seismic areas.
Terminology: platform vs balloon framing, load path (roof load → rafters → top plate → studs → sole plate → floor → foundation), bearing vs non-bearing wall, header sizing (per span and load), cripple stud, king stud, trimmer stud, jack stud, LVL (laminated veneer lumber) vs dimensional lumber, anchor bolt (J-bolt vs plate anchor), sill plate sealer, frost depth (footing depth), stem wall, slab-on-grade vs crawl space vs basement.
Safety: Structural modifications in load path require engineering review — removing or modifying a bearing wall without proper header installation causes structural failure. Never cut more than 1/3 of a stud for notching without reinforcement.
Typical step pattern: Layout with batter boards and string → excavate to frost depth → form and pour footings → cure concrete → form and pour/lay stem walls or slab → install sill plate with anchor bolts → frame floor platform → frame walls (layout, build flat, raise, brace) → frame roof.
Pro tip focus: Load path understanding (identifying bearing walls before any removal), header sizing for span, anchor bolt placement, why level and square batter boards make every subsequent step easier, concrete curing time before loading.`,

  'Flooring & interior finishes': `
DOMAIN EXPERTISE — Flooring & Interior Finishes:
Standards: NWFA (National Wood Flooring Association) installation guidelines for hardwood. TCNA (Tile Council of North America) Handbook for tile. ASTM F710 for resilient flooring installation.
Terminology: acclimation (wood flooring — 72 hours at installation conditions minimum), moisture content (wood vs subfloor delta < 4% for solid hardwood), subfloor flatness (3/16" in 10 ft for most hardwood and tile), floating vs nail-down vs glue-down installation, expansion gap (hardwood: 3/4" at all fixed objects), grout joint vs grout type (unsanded < 1/8" joint; sanded > 1/8"), thin-set vs mastic, CBU (cement board underlayment) for tile in wet areas, self-leveling compound.
Safety: Solvent-based adhesives and finishes require adequate ventilation and respirator rated for organic vapors. Flooring nailer operation creates significant impulse noise — hearing protection required.
Typical step pattern: Verify and correct subfloor flatness → address any moisture issues → acclimate flooring material → install underlayment or substrate as required by material → install flooring per manufacturer method → install transitions and trim → finish as required (site-finished hardwood only).
Pro tip focus: Subfloor preparation as the most critical step (unfixed subfloor defects telegraph through finished floor), acclimation requirement for solid hardwood, expansion gap as structural requirement (not optional), wet area tile substrate requirements (CBU or Schluter vs drywall).`,

  'Concrete & masonry': `
DOMAIN EXPERTISE — Concrete & Masonry:
Standards: ACI 318 (Building Code Requirements for Structural Concrete) for structural work. ASTM C150 for Portland cement. Local building code for permit requirements on footings and foundations.
Terminology: mix design (water-cement ratio — lower = stronger; target w/c < 0.45 for durable concrete), slump test, compressive strength (psi at 28 days — 3,000 psi standard residential), rebar sizing and spacing, cover (distance from rebar to surface — minimum 3" for ground exposure), curing (keeping concrete moist for 7 days minimum), anchor bolt placement, cold weather concrete (protect above 40°F during cure), mortar types (Type S for below-grade; Type N for above-grade masonry; Type M for pavers).
Safety: Wet concrete is strongly caustic (pH 12+) — prolonged skin contact causes chemical burns. Require nitrile or rubber gloves and eye protection for all concrete work. Silica dust from cutting or grinding concrete requires N95 minimum or P100 respirator.
Typical step pattern: Excavate to design depth → compact base → install rebar at correct spacing and cover → install forms level and braced → order/mix correct concrete → pour in lifts (< 18" per lift) → consolidate with vibrator → screed → finish surface → cure properly → strip forms after adequate cure.
Pro tip focus: Water-cement ratio as the primary driver of strength and durability (never add extra water to make concrete easier to work), consolidation with vibrator to eliminate honeycombing, curing duration and method, rebar cover for corrosion protection.`,

  'Insulation & weatherproofing': `
DOMAIN EXPERTISE — Insulation & Weatherproofing:
Standards: IECC climate zone R-value minimums by location. IRC N1102 for residential insulation. ASHRAE 62.2 for ventilation after tightening. Local permit requirements for re-insulation work.
Terminology: R-value, thermal bridging (studs conduct heat at ~R-1 vs cavity at R-13), continuous insulation (CI), vapor retarder vs barrier, perm rating, vapor drive direction (warm to cold — reverses between heating and cooling climates), WRB (weather-resistive barrier), flashing integration at windows and doors, sill pan flashing, drainage plane, air sealing vs air barrier, spray foam (2-component; open cell = vapor permeable vs closed cell = vapor barrier).
Safety: See energy efficiency entry above — spray foam chemical hazards and insulation fiber respiratory hazards. Closed-cell foam off-gassing after application — ventilate 24 hours before occupancy.
Typical step pattern: Identify leakage paths (blower door or visual inspection) → air seal penetrations and gaps first → install continuous insulation or cavity insulation to meet R-value → install vapor retarder if required (climate-dependent) → ensure drainage plane continuity → install WRB and flashing at openings → verify ventilation is adequate for tightened envelope.
Pro tip focus: Air sealing priority over insulation (insulation only works when air isn't bypassing it), climate zone vapor retarder requirements (wrong retarder causes moisture damage), thermal bridging losses from stud framing (CI eliminates this), drainage plane as the second line of defense after siding.`,

  // ─────────────────────────────────────────────────────────────────────────
  // SELF-SUFFICIENCY & SURVIVAL SKILLS
  // ─────────────────────────────────────────────────────────────────────────

  'Herbal medicine & first aid': `
DOMAIN EXPERTISE — Herbal Medicine & First Aid:
Standards: Reference Matthew Wood's "The Earthwise Herbal," herbalist David Hoffmann's "Medical Herbalism," and the American Herbalists Guild resources. For first aid, reference American Red Cross guidelines and Wilderness Medical Associates protocols for remote care.
Terminology: tincture (alcohol extract — menstruum), decoction (root/bark/hard material simmered), infusion (leaf/flower steeped), poultice, fomentation, adaptogen, carminative, vulnerary (wound healing), astringent, demulcent, antimicrobial (topical vs systemic considerations), drug-herb interactions, contraindications (pregnancy, medication interactions).
Safety: Herbal preparations are not a substitute for emergency medical care. Some herbs have significant drug interactions (St. John's Wort — CYP450 enzyme induction affects dozens of medications; warfarin interactions with many herbs). Any herbal preparation for internal use must be correctly identified — plant misidentification has caused serious toxicity and death.
Typical step pattern (tincture): Correctly identify and source plant material → determine solvent ratio (typically 50–60% alcohol for fresh root; 30–40% for dried leaf) → fill jar with plant material → cover with correct menstruum → macerate 4–6 weeks with occasional agitation → press and strain → decant and label (plant, part, solvent, date, ratio).
Pro tip focus: Why identification must precede any use, drug interaction screening as non-optional, starting with a trusted source/teacher vs self-study only, correct dosing is species and preparation dependent, not universal.`,

  'Hunting & fishing': `
DOMAIN EXPERTISE — Hunting & Fishing:
Standards: State fish and wildlife agency regulations are legally binding — seasons, bag limits, licensing, tagging, and weapon restrictions vary by species and state. Federal migratory bird regulations (US Fish & Wildlife). Hunter education certification (required in all 50 states).
Terminology: licensing, tags, bag limit, season dates, zone designations, weapon restrictions (archery vs firearm seasons), Hunter Orange requirements, stand safety (TMA harness, lifeline), field dressing, quartering, game processing, safe internal temperatures, fishing regulations (slot limits, size limits, catch-and-release handling).
Safety: Firearm safety: treat every gun as loaded, never point at anything you're not willing to destroy, finger off trigger until ready to fire, identify target and what's beyond it. Treestand: full-body harness from leaving ground to returning — fall-related fatalities are the #1 bowhunting fatality. Bear country protocols.
Typical step pattern (deer processing): Verify tag and legal harvest → field dress immediately → remove from field → age at appropriate temperature (34–37°F for 7–14 days for quality) → skin and quarter → process into cuts or grind → package and freeze within 2 hours of room-temperature cutting.
Pro tip focus: Regulations as legal requirement (not guidelines), tagging requirements immediately on harvest, aging for quality (most hunters skip this and sacrifice quality), treestand harness use from ground level.`,

  'Foraging & wild edibles': `
DOMAIN EXPERTISE — Foraging & Wild Edibles:
Standards: Reference Samuel Thayer's "Forager's Harvest" series and Tom Elpel's "Botany in a Day." Peterson Field Guides for regional specifics. Local regulations on foraging in parks and public lands (often restricted or prohibited).
Terminology: look-alike species (the most dangerous foraging hazard), habitat, phenology (time of year and growth stage), plant identification keys (family, genus, species), dichotomous key, edibility vs toxicity (some species have edible and toxic parts), seasonal windows, preparation methods that neutralize toxins (acorns → tannin leaching; elderberries → must cook; pokeweed → multi-stage water change).
Safety: Wild mushroom identification requires expert-level verification — the Amanita phalloides (death cap) closely resembles edible species and causes fatal liver failure. Never eat a wild plant or mushroom you haven't positively identified with multiple corroborating features. "When in doubt, throw it out" is the operative rule. Do not forage from roadsides, sprayed areas, or contaminated soil.
Typical step pattern: Learn to identify common edibles in your region through a class or with a mentor before solo foraging → verify identification using multiple features (not just photos) → harvest sustainably (never more than 1/3 of a stand) → prepare correctly for the species → start with small amounts if new to that plant.
Pro tip focus: Why foraging with a mentor beats books and apps alone, multiple-feature identification vs single-feature (apps have caused poisonings), preparation methods that are safety-critical vs flavor-only, sustainable harvest for perennial stands.`,

  'Fiber arts — spinning & weaving': `
DOMAIN EXPERTISE — Fiber Arts — Spinning & Weaving:
Standards: Reference Judith MacKenzie's "The Intentional Spinner," Ashford's spinning guides, and Ashenhurst's weaving calculations for sett.
Terminology: staple length, crimp, micron count (fiber diameter — finer = softer, <20 microns for next-to-skin), fleece preparation (skirting, washing/scouring, carding vs combing), roving vs top vs batts, drafting (the twist), twist per inch (TPI), WPI (wraps per inch — measures yarn weight), plying, balanced yarn, loom sett (EPI — ends per inch), warp vs weft, shuttle, selvedge, weave structures (plain vs twill vs satin).
Safety: Drum carder and hand card tines are very sharp — card with controlled movements and keep fingers away from the tines. Chemical fiber processing (mordanting for dyeing) involves metal salts (alum, copper, iron) that require gloves and ventilation.
Typical step pattern (fleece to yarn): Skirt fleece → weigh and wash (hot water + wool wash, no agitation — causes felting) → dry → card or comb → draft to appropriate roving thickness → spin to target TPI → ply if desired → set the twist (wet finish) → measure WPI to confirm yarn weight → wind into skein or cake.
Pro tip focus: Why agitation during washing felts wool (irreversibly), staple length suitability for hand spinning vs combing vs carding, twist direction (S vs Z) for plying, WPI as the standard for matching patterns.`,

  'Candle & soap making': `
DOMAIN EXPERTISE — Candle & Soap Making:
Standards: National Candle Association safety guidelines. ASTM F2106 (candle fire safety). FDA regulations apply to cosmetic soap labeling (soap that moisturizes is cosmetically regulated). Handcrafted Soap and Cosmetic Guild resources for soap making.
Terminology: saponification value (SAP value — lye required per gram of oil), lye discount (superfat percentage), trace (emulsification point in soap making), cold process vs hot process vs melt-and-pour soap, NaOH (sodium hydroxide — bar soap) vs KOH (potassium hydroxide — liquid soap), flashpoint (fragrance oils), wax type (paraffin vs soy vs beeswax vs coconut), wick sizing (burn pool diameter), fragrance load (% by wax weight), scent throw (hot vs cold throw).
Safety: Sodium hydroxide (lye) is strongly caustic — causes severe chemical burns on contact. Require eye protection, nitrile gloves, and long sleeves for all soap making. Work in ventilated area (fumes when lye contacts water). Never add water to lye — always add lye to water (prevents eruption). Store lye in sealed airtight container away from moisture.
Typical step pattern (cold process soap): Run lye calculation through soap calculator (SoapCalc) → measure oils by weight → melt and combine oils → dissolve lye into water (outside or ventilated) → cool both to 90–110°F → combine lye water into oils → mix to trace → add fragrance and additives → pour into mold → insulate 24–48 hours → unmold → cure 4–6 weeks.
Pro tip focus: Always use a soap calculator (never guess lye amounts), lye concentration safety procedure, trace recognition, 4–6 week cure for saponification completion and water evaporation (bars harden and lather improves).`,

  'Water filtration & storage': `
DOMAIN EXPERTISE — Water Filtration & Storage:
Standards: EPA National Primary Drinking Water Standards (MCLs for contaminants). NSF/ANSI 53 and 58 for certified filter performance claims. WHO guidelines for drinking water quality.
Terminology: turbidity (NTU), TDS (total dissolved solids), heavy metals, nitrates, coliform bacteria, sediment pre-filter, activated carbon (organic chemicals, chlorine, taste/odor), ceramic filter, UV sterilization (Giardia and Cryptosporidium — chlorine-resistant), reverse osmosis (removes dissolved solids including nitrates), gravity filter vs pressure filter, water activity, storage rotation.
Safety: UV sterilization requires pre-filtration for turbid water — turbidity shields pathogens from UV. Boiling kills biological threats but concentrates chemical contaminants. Never store water in non-food-grade containers — plasticizers leach into water.
Typical step pattern: Test source water (basic home test kit covers coliform, nitrates, pH, hardness) → identify contaminants present → select filter technology matched to contaminants (activated carbon doesn't remove nitrates or heavy metals — RO does) → size storage capacity → use food-grade containers → implement rotation schedule.
Pro tip focus: Why testing before filtering matters (solution must match the problem), filter technology limitations (no single filter handles all contaminants), UV + filtration combination for biological safety, storage rotation schedule (replace stored water every 6–12 months).`,

  'Emergency preparedness': `
DOMAIN EXPERTISE — Emergency Preparedness:
Standards: FEMA Ready.gov guidelines. CDC emergency preparedness resources. NIMS (National Incident Management System) for community-level response. Red Cross shelter-in-place and evacuation guidance.
Terminology: 72-hour kit, bug-out bag (BOB) vs bug-in (shelter-in-place), PACE plan (Primary, Alternate, Contingency, Emergency), water purification methods (boiling vs chemical vs filtration), NOAA Weather Radio, 72-hour vs 2-week vs 3-month supply planning, grid-down scenario, off-grid communication (ham radio, GMRS, satellite communicator), Faraday cage (EMP protection), medical preparedness (prescription management, first aid training).
Safety: Carbon monoxide from generators, heaters, and camp stoves is the leading cause of death during power outages — never operate combustion equipment indoors. Propane heating in unventilated spaces is lethal.
Typical step pattern: Assess most likely regional hazards → develop household communication and reunification plan → build 72-hour water supply first (1 gallon/person/day) → build food supply appropriate to likely outage duration → address medication and medical needs → communications plan → practice and update annually.
Pro tip focus: Water first (most critical, shortest survival window), rotating stock vs dedicated long-term storage, PACE planning for communication, why most emergency situations are 72-hour power outages not end-of-world scenarios (right-size the prep to the likely scenario).`,

  'Natural building materials': `
DOMAIN EXPERTISE — Natural Building Materials:
Standards: Reference the Cob Research Institute and ASTM standards for adobe (ASTM E2392). Local building codes for natural materials vary widely — some jurisdictions have adopted natural building chapters in their codes (California, New Mexico); most require engineer review or owner-builder exemption.
Terminology: cob (clay/sand/straw monolithic), adobe (formed clay blocks), rammed earth, straw bale (load-bearing vs infill), earthbag, lime plaster vs clay plaster (lime is exterior-appropriate; clay breathes for interior), vapor permeability (breathable walls), thermal mass, R-value of natural materials (low R-value, high thermal mass — different heat flow mechanism), ASTM E2392 Standard Guide for Design of Earthen Wall Building Systems.
Safety: Adobe and rammed earth mixing requires heavy labor — back injury risk. Lime is caustic in hydrated form — eye protection and gloves required. Straw bale construction has fire risk during the open wall phase before plastering.
Typical step pattern: Soil testing (shake test, ribbon test, jar test for clay/sand/silt ratios) → adjust mix as needed → build test panel and evaluate for shrinkage and strength → construct foundation with capillary break and moisture protection → build wall system → apply plaster (lime for exterior, clay for interior) → cure and protect.
Pro tip focus: Soil testing before committing to cob or adobe (clay content is the variable that makes or breaks the mix), capillary break at foundation level (natural walls are destroyed by rising moisture), lime vs clay plaster selection for application, vapor permeability advantages in appropriate climates.`,
};

/**
 * Returns the context block for a given subcategory, or a sensible fallback
 * if the subcategory isn't in the map (custom subcategories, typos, etc.).
 */
export function getSubcategoryContext(subcategory: string | undefined | null): string {
  if (!subcategory) return '';

  const context = subcategoryContexts[subcategory];
  if (context) return context.trim();

  // Generic fallback — better than nothing
  return `DOMAIN EXPERTISE — ${subcategory}:
Apply domain-specific best practices, use correct technical terminology, reference relevant safety standards, and structure steps according to the typical workflow for this type of task.`;
}
