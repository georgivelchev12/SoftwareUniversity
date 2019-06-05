function solve(input) {
    let inputArr = input[0].split('&');
    let pattern = /^[A-Z0-9]{16}$/gim;
    let pattern1 = /^[A-Z0-9]{25}$/gim;
    let keys = [];
    for (const key of inputArr) {
        if (key.match(pattern) || key.match(pattern1)) {
            if (key.length == 16) {
                let first = subtractDigit(key.substring(0, 4).toUpperCase());
                let second = subtractDigit(key.substring(4, 8).toUpperCase());;
                let third = subtractDigit(key.substring(8, 12).toUpperCase());;
                let fourth = subtractDigit(key.substring(12, 16).toUpperCase());;
                keys.push(`${first}-${second}-${third}-${fourth}`)
            }
            else if (key.length == 25) {
                let first = subtractDigit(key.substring(0, 5).toUpperCase());
                let second = subtractDigit(key.substring(5, 10).toUpperCase());;
                let third = subtractDigit(key.substring(10, 15).toUpperCase());;
                let fourth = subtractDigit(key.substring(15, 20).toUpperCase());;
                let fifth = subtractDigit(key.substring(20, 25).toUpperCase());;
                keys.push(`${first}-${second}-${third}-${fourth}-${fifth}`)
            
            }
        }
    }
    function subtractDigit(str) {
        let newSubstr = '';
        for (let i = 0; i < str.length; i++) {
            if (!isNaN(Number(str[i]))) {
                let newNum = 9 - Number(str[i]);
                newSubstr += newNum;
            }
            else {
                newSubstr += str[i];
            }
        }
        return newSubstr;
    }
    console.log(keys.join(', '));
    
}
solve(['t1kjZU764zIME6Dl9ryD0g1U8&-P4*(`Q>:x8\yE1{({X/Hoq!gR.&rg93bXgkmILW188m&KroGf1prUdxdA4ln&U3WH9kXPY0SncCfs'])