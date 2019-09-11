solve = (arr) => {
    let pattern = /([A-Za-z]+)(?<place>.+)\1/g;
    let placeholderPattern = /{(?<placeholder>.+?)}/g;
    let text = arr[0].match(pattern)
    let values = arr[1].match(placeholderPattern);
    for (let i = 0; i < text.length; i++) {
        while ((valid = pattern.exec(text[i])) !== null) {
            let validHolder = valid[0];
            valid[0] = valid[0].replace(valid.groups.place, values[i].substring(1, values[i].length - 1))

            arr[0] = arr[0].replace(validHolder, valid[0]);
        }
    }
    console.log(arr[0]);
}

anonimousVox = ([textinput, placeholdersinput]) => {
    let pattern = /([A-Za-z]+)(?<name>.+)(\1)/g
    let placeholders = placeholdersinput.match(/(?<={)([\w\s]+)(?=})/gi);
    let text = textinput;
    let index = 0;
    while ((word = pattern.exec(textinput)) !== null) {
        text = text.replace(word.groups.name, placeholders[index++]);
    }
    console.log(text);
}
anonimousVox(['HeypalHey______how_ya_how_doin_how',
    '{first}{second}'
]);
solve(['HeypalHey______how_ya_how_doin_how',
    '{first}{second}'
]);