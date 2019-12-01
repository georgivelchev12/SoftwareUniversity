function solve(arr) {
    let topIntegers = [];
    for (let i = 0; i < arr.length; i++) {
        let currentElement = arr[i];
        let isTopIntegers = true;
        for (let j = i + 1; j < arr.length; j++) {
            if (currentElement <= arr[j]) {
                arr[i] = arr[j];
                isTopIntegers = false;
                break;
            }
        }
        if (isTopIntegers == true) {
            topIntegers.push(currentElement);
        }
    }
    console.log(arr.join(' '));
}

solve([1, 4, 3, 2])