 // Get random numbers
export function getRandomNumbers (dcount:number, min:number, max:number) {
    const randomArray:Array<number> =  []  ;
    for(let i = min; i <= dcount; i++) {      
      randomArray[i-1] = randomNumber(max, 0, randomArray)       
    }       
    return randomArray;
  }
// recursive random number generation without any duplicate
function randomNumber  (max:number, min:number, randomArray:Array<number>): number {
const num = Math.floor(Math.random() * (max - min +1)) + min;
return randomArray.indexOf(num) >= 0 ? randomNumber(max, min, randomArray) : num;
}

 