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
  const result = arr.findIndex(( item : string )=>  stringCleanUp(str) === stringCleanUp(item));
  if(result === 1){
    return true
  }
  else{
    return false
  }

}

export const getMonthIndex = () =>{
  const currentMonth = new Date().getMonth();
  if(currentMonth<=6){
    return currentMonth
  }
  else {
    return (currentMonth - 6)
  }
}




