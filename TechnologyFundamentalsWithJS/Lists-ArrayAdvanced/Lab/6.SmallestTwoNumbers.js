function smallestTwoNumbers(arr) {
    let sortedArr = arr.sort((a,b)=>{return a-b});
    let slicedArr = sortedArr.slice(0,2)
    console.log(slicedArr.join(' '));
    
    
}