export const getMaxValue = (arr : any[], key : string) =>{
  const successLevels = arr.filter((obj)=>obj.type===true)
  const maxScore = Math.max(...successLevels.map(obj => obj[key]));
  return maxScore;
}

export const getStringAfterWord = (text: string) => {
  const word = "letter"
  const index = text.toLowerCase().indexOf(word);
  if (index === -1) {
    return text; // Return empty string if the word is not found
  }
  return text.substring(index + word.length).trim(); // Return substring after the word
};

export const checkTextInArray = (str : string) =>{
  const Array = ["see", "ji", "eye", "we"]
  if(Array.includes(str.toLowerCase())){
    return true
  }
  else{
    return false
  }
}




