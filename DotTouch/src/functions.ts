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

// Generate random non-overlapping positions as percentages.
// Uses axis-independent overlap detection: dots must be separated by at
// least `minDistX` horizontally AND `minDistY` vertically. This accounts
// for portrait screens where 1% horizontal ≈ fewer pixels than 1% vertical.
// If random placement fails after several full retries, falls back to a
// jittered grid that is guaranteed to produce non-overlapping positions.
export function getRandomPositions(count: number, minDistX: number, minDistY: number = minDistX * 0.5, edgePadding: number = 8): Array<{x: number, y: number}> {
  const padding = edgePadding;
  const maxRetries = 50;

  for (let retry = 0; retry < maxRetries; retry++) {
    const positions: Array<{x: number, y: number}> = [];
    let success = true;

    for (let i = 0; i < count; i++) {
      let placed = false;
      for (let attempt = 0; attempt < 1000; attempt++) {
        const x = padding + Math.random() * (100 - 2 * padding);
        const y = padding + Math.random() * (100 - 2 * padding);

        let tooClose = false;
        for (const p of positions) {
          if (Math.abs(x - p.x) < minDistX && Math.abs(y - p.y) < minDistY) {
            tooClose = true;
            break;
          }
        }
        if (!tooClose) {
          positions.push({ x, y });
          placed = true;
          break;
        }
      }
      if (!placed) {
        success = false;
        break; // restart entire placement from scratch
      }
    }

    if (success) return positions;
  }

  // Ultimate fallback: jittered grid (guaranteed non-overlapping)
  return jitteredGrid(count, padding);
}

// Place dots in shuffled grid cells with random jitter within each cell.
// Guarantees no overlap because each dot stays inside its own cell.
function jitteredGrid(count: number, padding: number): Array<{x: number, y: number}> {
  const usable = 100 - 2 * padding;
  const cols = Math.ceil(Math.sqrt(count * 0.55));
  const rows = Math.ceil(count / cols);
  const cellW = usable / cols;
  const cellH = usable / rows;

  const cells: Array<[number, number]> = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push([c, r]);
    }
  }
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  const positions: Array<{x: number, y: number}> = [];
  for (let i = 0; i < count; i++) {
    const [c, r] = cells[i];
    const cx = padding + (c + 0.5) * cellW;
    const cy = padding + (r + 0.5) * cellH;
    const jx = (Math.random() - 0.5) * cellW * 0.3;
    const jy = (Math.random() - 0.5) * cellH * 0.3;
    positions.push({ x: cx + jx, y: cy + jy });
  }
  return positions;
}
 