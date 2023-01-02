export function getParts(n: number) {
    const parts = [];        

    for (let i = 100; i < n; i++) {
       parts.push(i)
    }
    return parts;
} 

export function getRandom(array: any) {
    return array[Math.floor(Math.random() * array.length)];
}

export function getRandomN() {
    return Math.floor(Math.random() * 1000) + 100;


}

export function convertObjtoArray(data: any, zeroProbability : any) {
    const subArray = [];
    const zeroArray = [];
    const resultArray = [];
    if(data !== null || data !== undefined) {
        subArray?.push(data?.sum.toString())
        subArray?.push(data?.probability/100)
        resultArray.push(subArray)
    }
    
    if(zeroProbability !== null || zeroProbability !== undefined) {
        zeroArray?.push("0")
        zeroArray?.push(zeroProbability/100)
        resultArray?.push(zeroArray)
    }
    
    return resultArray;
}



