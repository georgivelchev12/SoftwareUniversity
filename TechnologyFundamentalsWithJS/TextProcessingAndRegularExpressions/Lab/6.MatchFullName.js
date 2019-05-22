function solve(str) {
    let validName;
    let validNames = [];
    let pattern = /\b[A-Z][a-z]+ \b[A-Z][a-z]+\b/g;
    while ((validName = pattern.exec(str)) !== null) {
        validNames.push(validName[0]);
    }
    console.log(validNames.join(' '));
}
solve("Steven Son, Steven son, steven Son, STeven Son, Michael Braun, MichaelBraun")