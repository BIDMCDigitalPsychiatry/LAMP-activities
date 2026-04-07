import { one, two, three, four, five, six, seven, eight, nine } from "./audioVars";

const numberAudio = [one, two, three, four, five, six, seven, eight, nine];

function playDigit(digit: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.src = numberAudio[digit - 1];
    audio.onended = () => resolve();
    audio.onerror = () => reject(new Error(`Failed to play digit ${digit}`));
    audio.load();
    audio.play().catch(reject);
  });
}

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Plays a sequence of digits with a gap between each.
 * Calls onDigit(digit) before each digit plays for visual display.
 * Calls onDigit(0) when finished to clear the display.
 */
export async function playSequence(
  sequence: number[],
  gapMs: number = 400,
  signal?: AbortSignal,
  onDigit?: (digit: number) => void
): Promise<void> {
  for (let i = 0; i < sequence.length; i++) {
    if (signal?.aborted) return;
    onDigit?.(sequence[i]);
    await playDigit(sequence[i]);
    if (i < sequence.length - 1) {
      await wait(gapMs);
    }
  }
  onDigit?.(0); // clear when done
}
