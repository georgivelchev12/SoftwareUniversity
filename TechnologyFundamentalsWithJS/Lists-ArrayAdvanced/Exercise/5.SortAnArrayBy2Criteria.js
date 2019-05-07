function sortAnArrayBy2Criteria(arr) {
    arr= arr.sort((a,b) => a.length - b.length ||a > b)
  
   // let sortBySecondCriteria = arr.sort((a,b)=>b.toLowerCase()-a.toLowerCase());
    console.log(arr.join('\n'));
}