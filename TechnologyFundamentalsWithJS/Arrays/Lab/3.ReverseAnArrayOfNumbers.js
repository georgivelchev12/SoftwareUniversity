function solve(num,arr) {
    let resultArr = [];
    let output = '';
    // for (let i = 0; i < num; i++) {
    //     let currentElement = arr[num - 1 - i];
    //     resultArr.push(currentElement);
    // }

    for(let i = num;i>0;i--){
        let currentElement = arr[i-1];
        resultArr.push(currentElement);
    }
    for (let i = 0; i < resultArr.length; i++) {
        output += resultArr[i]+ " ";   
    }
    console.log(output.trim());
    

}