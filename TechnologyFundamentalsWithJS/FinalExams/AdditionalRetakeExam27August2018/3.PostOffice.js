solve = (arr) => {
    let input = arr[0].split('|');
    let firstPattern = /([#$%*&])(?<capitals>[A-Z]{1,})\1/g;
    let secondPattern = /[0-9]{2}:[0-9]{2}/g;
    let thirdPattern = /(?<=\s|^)[^ ]+(?=\s|$)/g;

    let matchedFirst = firstPattern.exec(input[0]);
    let matchedSecond = input[1].match(secondPattern);
    let matchedThird = input[2].match(thirdPattern);

    let capitals = matchedFirst.groups.capitals;
    for (let letter of capitals) {
        dance:
            for (let matchedSecondElement of matchedSecond) {
                let [asciiCode, length] = matchedSecondElement.split(':');
                asciiCode = +asciiCode;
                length = +length;
                for (let word of matchedThird) {
                    if ((letter.charCodeAt(0) == asciiCode)
                        && (length == word.length - 1)
                        && word.startsWith(letter)) {
                        console.log(word);
                        break dance;
                    }
                }
            }
    }
};

solve(['Urgent"Message.TO$#POAML#|readData79:05:79:0!2reme80:03--23:11{79:05}tak{65:11ar}!77:!23--)77:05ACCSS76:05ad|Ankh-Morpork Remedy Por Ostream :Istream Post sOffices Office Of MR.LIPWIG Mister Lipwig'])