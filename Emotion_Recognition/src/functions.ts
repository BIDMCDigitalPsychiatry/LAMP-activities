export function shuffleArray(arr: any) {
  arr?.sort(() => Math.random() - 0.5);
  return arr
}