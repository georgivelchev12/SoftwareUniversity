function charsInRange(startChar, endChar) {
    let start = startChar.charCodeAt(0);
    let end = endChar.charCodeAt(0);

    let charsInRange = [];

    if (start < end) {


        for (let i = start + 1; i < end; i++) {
            charsInRange.push(String.fromCharCode(i));
        }
        console.log(charsInRange.join(' '));
    }
    else {
        for (let i = end + 1; i < start; i++) {
            charsInRange.push(String.fromCharCode(i));
        }
        console.log(charsInRange.join(' '));
    }
}