export const getMaxValue = (arr : any[], key : string) =>{
  const successLevels = arr.filter((obj)=>obj.type===true)
  const maxScore = Math.max(...successLevels.map(obj => obj[key]));
  return maxScore;
}

export const getSequence = (arr : any[]) => {
  let text = "";  
  arr.map((item: any, i)=>{
    const res = item["type"]===true ? "correct" : "incorrect"
    if(i==0){
      text = item["level"]+"% "+res
    }
    else{
      text = text +", "+item["level"]+"% "+res
    }    
  })
  return text
}

export const getStringAfterWord = (text: string) => {
  const word = "letter"
  const index = text.toLowerCase().indexOf(word);
  if (index === -1) {
    return text; // Return empty string if the word is not found
  }
  return text.substring(index + word.length).trim(); // Return substring after the word
};

export const checkTextInArray = (str : string, letter : string) =>{
  let res = false
  const Array = [{letter : "c", text : "see"},{letter : "g", text : "ji"},{letter : "i", text : "eye"}, {letter : "v", text : "we"}]
  Array.forEach((item: any)=>{
    if(item.letter === letter.toLowerCase() && str.includes(item.text.toLowerCase())){
      res = true
    }
  })
  
  return res;
}




