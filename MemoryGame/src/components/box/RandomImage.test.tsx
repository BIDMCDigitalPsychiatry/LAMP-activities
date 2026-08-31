import getImages from "./RandomImage";
import { memoryImageCategories, CATEGORY_NAMES } from "./MemoryImageLibrary";

const SEQ_LENGTHS = [3, 4]; // the only values Boxes.tsx produces
const RUNS = 200;

describe("MemoryGame stimulus library", () => {
  test("has 18 categories of 6 images", () => {
    expect(memoryImageCategories).toHaveLength(18);
    memoryImageCategories.forEach((category) => {
      expect(category).toHaveLength(6);
    });
  });

  test("names every category", () => {
    expect(CATEGORY_NAMES).toHaveLength(memoryImageCategories.length);
  });

  test("uses unique, stable, zero-padded stimulus keys", () => {
    const keys = memoryImageCategories.flatMap((category) =>
      category.map((image) => image.key)
    );

    expect(keys).toHaveLength(108);
    expect(new Set(keys).size).toBe(108);
    keys.forEach((key) => expect(key).toMatch(/^\d{3}$/));
    expect(keys[0]).toBe("001");
    expect(keys[107]).toBe("108");
  });
});

describe("getImages selection", () => {
  test.each(SEQ_LENGTHS)("returns %i targets from distinct categories", (limit) => {
    for (let run = 0; run < RUNS; run++) {
      const { images, resultImages, imageIndexes } = getImages(limit);

      expect(images).toHaveLength(limit);
      expect(resultImages).toHaveLength(limit * 3);
      expect(imageIndexes).toHaveLength(limit);

      const categories = imageIndexes.map((i) => i.category);
      expect(new Set(categories).size).toBe(limit);

      imageIndexes.forEach(({ category, index }) => {
        expect(category).toBeGreaterThanOrEqual(1);
        expect(category).toBeLessThanOrEqual(18);
        expect(index).toBeGreaterThanOrEqual(1);
        expect(index).toBeLessThanOrEqual(6);
      });
    }
  });

  test("selection grid holds distinct images and contains every target", () => {
    for (let run = 0; run < RUNS; run++) {
      const { images, resultImages } = getImages(4);
      const gridKeys = resultImages.map((image) => image.key);

      expect(new Set(gridKeys).size).toBe(gridKeys.length);
      images.forEach((target) => expect(gridKeys).toContain(target.key));
    }
  });

  test("each target's distractors come from the target's own category", () => {
    for (let run = 0; run < RUNS; run++) {
      const { imageIndexes, resultImages } = getImages(4);
      const gridKeys = new Set(resultImages.map((image) => image.key));

      imageIndexes.forEach(({ category }) => {
        const fromCategory = memoryImageCategories[category - 1].filter((image) =>
          gridKeys.has(image.key)
        );
        expect(fromCategory).toHaveLength(3); // 1 target + 2 alternatives
      });
    }
  });

  test("throws rather than hanging when more categories are requested than exist", () => {
    expect(() => getImages(19)).toThrow(/only 18 exist/);
  });
});

describe("result payload safety", () => {
  // Regression guard. Stimuli are base64-embedded, so rendering them as
  // <img src="data:..."> would put the entire image in props — and Board.tsx
  // serializes these elements straight into the uploaded result payload.
  // Component elements carry no props, so they stay cheap to serialize.
  test("serialized stimulus elements carry no image data", () => {
    const { images, resultImages } = getImages(4);
    const serialized = JSON.stringify({ images, resultImages });

    expect(serialized).not.toContain("data:image");
    expect(serialized).not.toContain("base64");
    expect(serialized.length).toBeLessThan(2000);
  });
});
