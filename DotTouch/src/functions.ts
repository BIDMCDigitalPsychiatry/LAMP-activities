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

export function getRandomAlphaNumeric(to:number)
{
  const result = []; 
  let fromChar = 'A';
  let from  = 1;
  while (from <= to) {    
    result.push( from + '');
    result.push( fromChar + '');
    fromChar = String.fromCharCode(fromChar.charCodeAt(0) + 1);
    from = from + 1;
  }  
  return result;
}

export function shuffle(numbers: Array<string>){
  const result = numbers.slice().sort(() => Math.random() - 0.5);
  return result;

}
 