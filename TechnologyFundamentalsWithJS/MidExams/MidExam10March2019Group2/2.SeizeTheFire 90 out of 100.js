function solve(input) {
    let effort = 0;
    let cells = [];
    let totalFire = 0;
    let splited = input[0].split('#');
    let amountOfWater = input[1];
    for (let i = 0; i < splited.length; i++) {

        let [command, value] = splited[i].split(' = ')
        value = Number(value);
        if (amountOfWater < value) {
            break;
        }
        switch (command) {
            case 'High':
                if (value >= 81 && value <= 125) {
                    cells.push(` - ${value}`);
                    amountOfWater -= value;
                    effort += (value * 0.25);
                    totalFire += value;
                }
                break;

            case 'Medium':
                if (value >= 51 && value <= 80) {
                    cells.push(` - ${value}`);
                    amountOfWater -= value;
                    effort += (value * 0.25);
                    totalFire += value;
                }
                break;

            case 'Low':
                if (value >= 1 && value <= 50) {
                    cells.push(` - ${value}`);
                    amountOfWater -= value;
                    effort += (value * 0.25);
                    totalFire += value;
                }
                break
        }
    }
    console.log(`Cells:`)
    for (let cell of cells) {
        console.log(cell);
    }
    console.log(`Effort: ${effort.toFixed(2)}`);
    console.log(`Total Fire: ${totalFire}`);


}
solve(['High = 150#Low = 55#Medium = 86#Low = 40#High = 110#Medium = 77',
    220])