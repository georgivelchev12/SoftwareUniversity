function solve(input) {
    let str = input.split('');

    for (let i = 0; i < str.length; i++) {
        while (str[i] == str[i + 1]) {
            str.splice(i, 1)
        }
    }
    console.log(str.join(''))
}