function solve(text,searchedSubstr) {
    text = text.toLowerCase()
    searchedSubstr = searchedSubstr.toLowerCase();
    let textToArr = text.split(' ');
    let counter = 0;
    for (const word of textToArr) {
        if (word.includes(searchedSubstr)) {
            counter++;
        }
    }
    console.log(counter);
}
solve("Welcome to the Software University (SoftUni)! Welcome to programming. Programming is wellness for developers, said Maxwell.", "wel")