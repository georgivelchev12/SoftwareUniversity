function solve(arr) {
    let linesNumber = Number(arr.shift());
    let lines = arr;
    let weightOfAnimals = 0;
   for (let i = 0; i < linesNumber; i++) {
       let pattern = /^n:(?<name>[^;]+);t:(?<kind>[^;]+);c--(?<country>[A-Za-z ]+)$/g;
       if ((validLine = pattern.exec(lines[i])) !== null) {
            let nameCode = validLine.groups['name'];
            let kindCode = validLine.groups['kind'];
            let country = validLine.groups['country'];
            let name = nameCode.match(/[A-Za-z ]+/g).join('');
            let kind = kindCode.match(/[A-Za-z ]+/g).join('');
            weightOfAnimals += nameCode.replace(/[^0-9]/g,'')
                .split('')
                .map(Number)
                .reduce((a,b) => a+b,0);
            weightOfAnimals += kindCode.replace(/[^0-9]/g,'')
                .split('')
                .map(Number)
                .reduce((a,b) => a+b,0);
           console.log(`${name} is a ${kind} from ${country}`);
        }
    }
    console.log(`Total weight of animals: ${weightOfAnimals}KG`);
}
solve([ '4',
    'n:Bo^%4b35454bie#$;t:Ele5ph#$34a%nt;c--Africa',
    'n:Honey;t:Ti^^5ger;c--India',
    'bla;t:1234a;c--America',
    'n:A#$@545n;t:Cat241$@#23;cGermany' ]

);