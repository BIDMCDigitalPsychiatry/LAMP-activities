/**
 * @file   src\components\DataForEachMonth\stimulusData.ts
 * @brief  FunnyMemory v2 stimulus library (6 months x 6 trials x 6 images)
 *
 * Each trial supplies one primary image (shown during learning and offered as
 * the correct choice at recognition), one cue image (the partial scene used to
 * prompt cued recall), and four distractors. Recognition therefore presents
 * five options rather than the four used by the v1 library, so chance
 * performance is 20% rather than 25% — scores are NOT comparable across
 * stimulus set versions. Filter on `stimulus_set_version` before pooling.
 *
 * Images are fetched at runtime rather than bundled: 216 files at ~120KB each
 * would add roughly 35MB to the base64-inlined artifact, against ~3MB for the
 * largest activity shipping today. Only the six trials of the current month are
 * ever requested, so a session pulls ~3.2MB.
 *
 * The base URL is pinned to a tag rather than a branch. Serving from a moving
 * ref means the stimuli a participant sees are whatever happens to be on that
 * branch at the time, which for a longitudinal instrument allows the set to
 * change silently mid-study.
 */

export const STIMULUS_SET_VERSION = "funny-memory-v2-2026-07";

/**
 * Update this tag when the stimulus library changes, together with
 * STIMULUS_SET_VERSION. The tag must exist on the BIDMC repository.
 */
const STIMULUS_TAG = "funny-memory-v2-2026-07";

const DEFAULT_IMAGE_BASE_URL =
  "https://raw.githubusercontent.com/BIDMCDigitalPsychiatry/LAMP-activities/" +
  `${STIMULUS_TAG}/FunnyImages-v2`;

const IMAGE_BASE_URL =
  process.env.REACT_APP_FUNNY_IMAGES_BASE_URL || DEFAULT_IMAGE_BASE_URL;

type StimulusDefinition = {
  scene: string;
  targetTerms: string[];
  question: string;
};

const MONTH_STIMULI: Record<number, StimulusDefinition[]> = {
  1: [
    { scene: "canyon", targetTerms: ["door", "wooden door"], question: "What was in the canyon?" },
    { scene: "dog", targetTerms: ["hat", "sun hat", "cap"], question: "What was the dog wearing?" },
    { scene: "grater", targetTerms: ["light bulb", "lightbulb", "bulb"], question: "What was next to the grater?" },
    { scene: "chessboard", targetTerms: ["calculator"], question: "What was next to the chessboard?" },
    { scene: "fire extinguisher", targetTerms: ["scarf"], question: "What was wrapped around the fire extinguisher?" },
    { scene: "plant", targetTerms: ["rabbit", "bunny"], question: "What was in the plant?" },
  ],
  2: [
    { scene: "waterfall", targetTerms: ["temple", "pagoda"], question: "What was in front of the waterfall?" },
    { scene: "birdcage", targetTerms: ["car", "toy car"], question: "What was inside the birdcage?" },
    { scene: "microwave", targetTerms: ["eggbeater", "egg beater", "whisk"], question: "What was inside the microwave?" },
    { scene: "racquet", targetTerms: ["baseballs", "baseball", "balls"], question: "What was on the racquet?" },
    { scene: "chair", targetTerms: ["monkey"], question: "What was sitting on the chair?" },
    { scene: "pocketknife", targetTerms: ["umbrella", "cocktail umbrella"], question: "What was next to the pocketknife?" },
  ],
  3: [
    { scene: "cherry trees", targetTerms: ["moose"], question: "What was beneath the cherry trees?" },
    { scene: "dog bowl", targetTerms: ["ping-pong paddle", "ping pong paddle", "paddle"], question: "What was in the dog bowl?" },
    { scene: "mixer", targetTerms: ["tennis balls", "tennis ball", "balls"], question: "What was inside the mixer?" },
    { scene: "goal", targetTerms: ["bicycle", "bike"], question: "What was in front of the goal?" },
    { scene: "painting", targetTerms: ["cello"], question: "What was in front of the painting?" },
    { scene: "closet", targetTerms: ["lighthouse"], question: "What was inside the closet?" },
  ],
  4: [
    { scene: "bridge", targetTerms: ["Buddha", "Buddha statue", "statue"], question: "What was on the bridge?" },
    { scene: "Barney", targetTerms: ["fishing rod", "fishing pole"], question: "What was Barney holding?" },
    { scene: "pot", targetTerms: ["shoe", "shoes", "sneakers"], question: "What was inside the pot?" },
    { scene: "sled", targetTerms: ["dog"], question: "What was sitting in the sled?" },
    { scene: "candle", targetTerms: ["headphones"], question: "What was around the candle?" },
    { scene: "baby carriage", targetTerms: ["seal", "seals"], question: "What was inside the baby carriage?" },
  ],
  5: [
    { scene: "pond", targetTerms: ["elephant"], question: "What was standing in the pond?" },
    { scene: "shell", targetTerms: ["watch", "wristwatch"], question: "What was inside the shell?" },
    { scene: "teapot", targetTerms: ["flower", "flowers"], question: "What was inside the teapot?" },
    { scene: "backpack", targetTerms: ["soccer ball", "football", "ball"], question: "What was inside the backpack?" },
    { scene: "toilet", targetTerms: ["tree"], question: "What was growing from the toilet?" },
    { scene: "firewood", targetTerms: ["net"], question: "What was next to the firewood?" },
  ],
  6: [
    { scene: "snowy forest", targetTerms: ["telescope"], question: "What was in the snowy forest?" },
    { scene: "sunset", targetTerms: ["lion"], question: "What animal was at the sunset?" },
    { scene: "horn", targetTerms: ["duck", "rubber duck"], question: "What was next to the horn?" },
    { scene: "basket", targetTerms: ["hanger", "clothes hanger"], question: "What was in front of the basket?" },
    { scene: "bathtub", targetTerms: ["sheet music", "music", "musical score", "trail marker"], question: "What was above the bathtub?" },
    { scene: "surge protector", targetTerms: ["forks", "fork"], question: "What was plugged into the surge protector?" },
  ],
};

const pad = (value: number) => value.toString().padStart(2, "0");

export const createDataForMonth = (month: number) => {
  const stimuli = MONTH_STIMULI[month];

  if (!stimuli) {
    throw new Error(
      `No FunnyMemory stimulus data configured for month ${month}`
    );
  }

  return stimuli.map((stimulus, index) => {
    const trial = index + 1;
    const code = `M${pad(month)}_T${pad(trial)}`;
    const trialBase = `${IMAGE_BASE_URL}/month-${pad(month)}/trial-${pad(
      trial
    )}/${code}`;
    const primary = `${trialBase}_Primary.jpg`;

    return {
      id: index,
      images: [stimulus.scene, ...stimulus.targetTerms],
      img: primary,
      matched: false,
      option: [
        primary,
        `${trialBase}_Distractor01.jpg`,
        `${trialBase}_Distractor02.jpg`,
        `${trialBase}_Distractor03.jpg`,
        `${trialBase}_Distractor04.jpg`,
      ],
      missingImg: `${trialBase}_Cue.jpg`,
      missingItem: stimulus.targetTerms,
      question: stimulus.question,
      stimulusSetVersion: STIMULUS_SET_VERSION,
      stimulusMonth: month,
      stimulusTrial: trial,
    };
  });
};
