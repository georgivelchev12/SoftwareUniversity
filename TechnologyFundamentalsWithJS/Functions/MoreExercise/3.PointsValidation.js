function PointsValidation(arr) {
    let first = 0;
    let second = 0;
    let final = 0;

        first = Math.sqrt((0 - arr[0])*(0 - arr[0]) + (0 - arr[1])*(0 - arr[1]));
        second = Math.sqrt((0 - arr[2])*(0 - arr[2]) + (0 - arr[3])*(0 - arr[3]));
        final = Math.sqrt((arr[1] - arr[3])*(arr[1] - arr[3]) + (arr[0] - arr[2])*(arr[0] - arr[2]));
        if (Number.isInteger(first)) {
            console.log(`{${arr[0]}, ${arr[2]}} to {0, 0} is valid`);
        }
        else{
            console.log(`{${arr[0]}, ${arr[2]}} to {0, 0} is invalid`);
        }
        if (Number.isInteger(second)) {
            console.log(`{${arr[1]}, ${arr[3]}} to {0, 0} is valid`);
        }
        else{
            console.log(`{${arr[1]}, ${arr[3]}} to {0, 0} is invalid`);
        }
        if (Number.isInteger(final)) {
            console.log(`{${arr[0]}, ${arr[2]}} to {${arr[1]}, ${arr[3]}} is valid`);
        }
        else{
            console.log(`{${arr[0]}, ${arr[2]}} to {${arr[1]}, ${arr[3]}} is invalid`);
    
        }
}

PointsValidation([2, 1, 1, 1]);