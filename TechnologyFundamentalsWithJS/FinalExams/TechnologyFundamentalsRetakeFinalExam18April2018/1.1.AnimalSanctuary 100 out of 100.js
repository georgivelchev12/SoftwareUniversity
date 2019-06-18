function solve(arr) {
    let linesNumber = Number(arr[0]);
    let weightOfAnimals = 0;
    for (let i = 1; i <= linesNumber; i++) {
        let pattern = /^n:[^;]+;t:[^;]+;c--[A-Za-z ]+$/g;
        let [animalName, animalKind, animalCountry] = arr[i].split(';');
        if (arr[i].match(pattern)) {
            let nameCode = animalName.split('n:')[1];
            let kindCode = animalKind.split('t:')[1];
            let country = animalCountry.split('c--')[1];
            let [name,weightName] = checkAndSum(nameCode);
            let [kind,weightKind] = checkAndSum(kindCode);
            weightOfAnimals += weightName + weightKind;
            console.log(`${name} is a ${kind} from ${country}`);
        }
    }
    console.log(`Total weight of animals: ${weightOfAnimals}KG`);
    function Sum(weight) {
        return weight.replace(/[^0-9]/g, '')
            .split('')
            .map(Number)
            .reduce((a, b) => a + b, 0);
    }
    function checkAndSum(arg1){
        let output = '';
        let weight = 0
        arg1 = arg1.split('');
        let pattern1 = /[a-z\s]/gi;
        let pattern2 = /[0-9]/g;
        arg1.forEach(el => {
            if (el.match(pattern1)) {
                output += el;
            } else if (el.match(pattern2)) {
                weight += Number(el);
            }
        });
        return [output, weight];
    }
}
solve(['3',
    'n:M5%ar4#le@y;t:B3#e!!a2#2r;c--Australia',
    'n:G3e%6org43e;t:C€$at2%;c--Africa',
    'n:AlicE:Won;c-India']);