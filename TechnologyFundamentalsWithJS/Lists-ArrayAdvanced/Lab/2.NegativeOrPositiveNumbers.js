function NegativeOrPositiveNumbers(arr) {
    let newArr = [];
    for (let element of arr) {
        if (element < 0) {
            newArr.unshift(element);
        }
        else {
            newArr.push(element);
        }
    }

    // for (let i = 0; i < newArr.length; i++) {
    //     console.log(newArr[i]);
    // }
    //nachin 2
    console.log(newArr.join('\n'));
    
}