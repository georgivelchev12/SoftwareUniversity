function solve(arr) {
    let lastElement = Number(arr[arr.length-1]);
    arr.pop()
    for (let i = 0; i < lastElement%10; i++) {
        arr.unshift(arr.pop());
        if (arr[i] == 'remove') {
            arr.pop();
        }
    }
    if (arr.length <= 0) {
        console.log('Empty');
        return;
    }
    console.log(arr.join(' '));
}