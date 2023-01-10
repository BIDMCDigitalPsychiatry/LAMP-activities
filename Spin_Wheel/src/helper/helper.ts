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
    let dataArray = ["0","50", "100", "250"]
    const subArray = [];    
    const zeroArray = [];
    const resultArray = [];
    if((data !== null && data !== undefined) && data?.probability !== 0) {
        subArray?.push(data?.sum.toString())
        subArray?.push(data?.probability/100)
        resultArray.push(subArray)
    }
    else if(data?.probability === 0){
        if(zeroProbability === 0){
            dataArray =  dataArray.filter((element : any) =>  element !== "0")
        }
        dataArray.forEach((dataElement : any) =>{
            const tempArray: any = [];
            if(dataElement !== data?.sum.toString()){
                tempArray?.push(dataElement)
                tempArray?.push(50/100)
                resultArray.push(tempArray)
            }
        })
    }
    
    if((zeroProbability !== null && zeroProbability !== undefined) && zeroProbability !== 0) {
        zeroArray?.push("0")
        zeroArray?.push(zeroProbability/100)
        resultArray?.push(zeroArray)
    }
    
    return resultArray;
}

export function shuffleArray(arr : any) {
    arr.sort(() => Math.random() - 0.5);
    return arr;
}



