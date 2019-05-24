function solve(input) {
    let names = input.shift().split('&');

    for (const arg of input) {
        let [command, kidName, newName] = arg.split(' ')
        switch (command) {
            case 'Bad':
                if (!names.includes(kidName)) {
                    names.unshift(kidName);
                }
                break;
            case 'Good':
                if (names.includes(kidName)) {
                    let indexOfKid = names.indexOf(kidName);
                    names.splice(indexOfKid, 1);
                }
                break;
            case 'Rename':
                if (names.includes(kidName)) {
                    let indexOfRenamedKid = names.indexOf(kidName)
                    names.splice(indexOfRenamedKid, 1, newName);
                }
                break;
            case 'Rearrange':
                if (names.includes(kidName)) {
                    let indexOfRearrangedKid = names.indexOf(kidName);
                    names.splice(indexOfRearrangedKid,1);
                    names.push(kidName);
                }
                break;

            default:
                console.log(names.join(', '));
                
                break;
        }
    }
}

// solve(['Peter&George&Mike',
//     'Bad Joshua',
//     'Good Peter',
//     'Finished!']
//     )

solve(['Joshua&Aaron&Walt&Dustin&William',
    'Good Walt',
    'Bad Jon',
    'Rename Aaron Paul',
    'Rearrange Jon',
    'Rename Peter George',
    'Finished!'])