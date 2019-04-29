function solve(arr) {
    // arr.reverse();
    // console.log(arr.join(' '));
    for (let i = 0; i < arr.length/2; i++) {
        let lowerElement = arr[i];
        arr[i] = arr[arr.length - 1 - i];
        arr[arr.length - 1 - i]= lowerElement;
    }
    console.log(arr.join(' '));
    
}