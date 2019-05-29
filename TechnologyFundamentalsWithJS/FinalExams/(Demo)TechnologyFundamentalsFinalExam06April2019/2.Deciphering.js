function solve(input) {
 
    let encryptedString = input.shift();
    let output = '';
    let isNotWrongBook = true;
    let result = '';
    for (let i = 0; i < encryptedString.length; i++) {
        let charIndex = encryptedString.charCodeAt((i));
        if ((100 <= charIndex && charIndex <= 122) ||
            charIndex === 123 ||
            charIndex === 124 ||
            charIndex === 125 ||
            charIndex === 35) {
 
            charIndex = charIndex - 3;
            output += String.fromCharCode(charIndex);
        } else {
            console.log('This is not the book you are looking for.');
            isNotWrongBook = false;
            break;
        }
    }
 
    if (isNotWrongBook) {
        let [substr1, substr2] = input.shift().split(' ');
 
        for (let i = 0; i < output.length; i += substr1.length) {
            let curstr = output.substr(i, substr1.length);
            if (curstr === substr1) {
                curstr = substr2;
            }
            result += curstr;
        }
    }
    console.log(result);
}
solve(['wkhfn#|rx#jhqfkr#phf#exw#|rxu#uholf#lv#khfgohg#lq#hfrwkhu#sohfhw',
    'ec an']
    )