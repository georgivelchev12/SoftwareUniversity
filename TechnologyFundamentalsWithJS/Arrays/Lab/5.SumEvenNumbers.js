function solve(arr) {
    let sum = 0;
    let result = 0;
    for (let i = 0; i < arr.length; i++) {

        if (arr[i]%2==0) {
         sum += Number(arr[i]);

            
        }
    }
    console.log(sum);
    
}