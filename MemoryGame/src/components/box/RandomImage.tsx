import * as React from "react";
import { memoryImageCategories } from "./MemoryImageLibrary";

/** Distractors shown alongside each target in the selection grid. */
const ALTERNATIVES_PER_TARGET = 2;

/** Fisher-Yates. Returns a new array rather than mutating the input. */
function shuffled<T>(source: ReadonlyArray<T>): T[] {
  const array = [...source];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Picks `limit` target images, each from a distinct category, plus
 * ALTERNATIVES_PER_TARGET same-category distractors for the selection grid.
 *
 * Returns:
 *   images       — the targets, in presentation order
 *   resultImages — targets + distractors, shuffled, for the selection grid
 *   imageIndexes — 1-based { category, index } per target, recorded in results
 */
export default function getImages(limit: number) {
  const categoryCount = memoryImageCategories.length;

  if (limit > categoryCount) {
    throw new Error(
      `MemoryGame requested ${limit} categories but only ${categoryCount} exist`
    );
  }

  const categoryOrder = shuffled(Array.from(Array(categoryCount).keys())).slice(
    0,
    limit
  );

  const targets: React.ReactElement[] = [];
  const selectionGrid: React.ReactElement[] = [];
  const imageSelections: Array<{ category: number; index: number }> = [];

  categoryOrder.forEach((categoryIndex) => {
    const category = memoryImageCategories[categoryIndex];

    // One draw of distinct offsets: the first is the target, the rest are its
    // distractors. Avoids the retry loops the previous implementation used,
    // which could spin indefinitely when a category ran out of alternatives.
    const picks = shuffled(Array.from(Array(category.length).keys())).slice(
      0,
      ALTERNATIVES_PER_TARGET + 1
    );
    const targetIndex = picks[0];

    targets.push(category[targetIndex]);
    picks.forEach((offset) => selectionGrid.push(category[offset]));

    imageSelections.push({
      category: categoryIndex + 1,
      index: targetIndex + 1,
    });
  });

  return {
    images: targets,
    resultImages: shuffled(selectionGrid),
    imageIndexes: imageSelections,
  };
}
