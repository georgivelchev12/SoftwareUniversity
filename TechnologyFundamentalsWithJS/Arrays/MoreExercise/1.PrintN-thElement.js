function solve(arr) {
    let lastElement = arr.pop();
    let output = '';
    let out = '';
    for (let i = 0; i < arr.length; i++) {
        
        if (i%lastElement ==0) {
            out += arr[i] + " ";
        }
    }
    console.log(out);
    
}