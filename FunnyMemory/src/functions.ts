export function shuffleArray(arr: any) {
  arr?.sort(() => Math.random() - 0.5);
  return arr
}

// Get random numbers
export function getRandomNumbers(dcount: number, min: number, max: number) {
  const randomArray: Array<number> = [];
  for (let i = min; i <= dcount; i++) {
    randomArray[i - 1] = randomNumber(max, 0, randomArray)
  }
  return randomArray;
}
// recursive random number generation without any duplicate
function randomNumber(max: number, min: number, randomArray: Array<number>): number {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomArray.indexOf(num) >= 0 ? randomNumber(max, min, randomArray) : num;
}

// Function to replace duplicates with an empty string
export const replaceDuplicatesWithEmptyString = (arr: any[]) => {
  const seen = new Set();
  return arr.map(item => {
    if (seen.has(item.toLowerCase().replace(/\s+/g, ""))) {
      return ''; // Replace duplicate with an empty string
    }
    seen.add(item.toLowerCase().replace(/\s+/g, ""));
    return item; // Return the original item if not a duplicate
  });
};

export const stringCleanUp = (str : string) =>{
  return str.toLowerCase().replace(/\s+/g, "")
}

export const checkIsStringInArray = (arr: string[], str : string) =>{
  const result = arr.findIndex(( item : string )=>  stringCleanUp(item) === stringCleanUp(str));
  if(result != -1){
    return true
  }
  else{
    return false
  }

}

export const getMonthIndex = () =>{
  const currentMonth = new Date().getMonth() + 1;
  if(currentMonth<=6){
    return currentMonth
  }
  else {
    return (currentMonth - 6)
  }
}

export function isTimestamp(value: string | number | Date): boolean {
  const timestamp = typeof value === 'number' || typeof value === 'string'
    ? Number(value)
    : value instanceof Date
    ? value.getTime()
    : NaN;

  if (isNaN(timestamp)) return false;

  // Timestamp boundaries (in milliseconds)
  const minValidDate = new Date('2000-01-01').getTime();
  const maxValidDate = new Date('2100-01-01').getTime();

  return timestamp >= minValidDate && timestamp <= maxValidDate;
}




