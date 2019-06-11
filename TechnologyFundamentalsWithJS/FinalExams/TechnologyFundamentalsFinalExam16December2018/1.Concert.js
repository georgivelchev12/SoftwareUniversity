function solve(arr){
    let bands = {};
    let bandTimes = {};
    for (let arrElement of arr) {

        let [command,bandName,members] = arrElement.split('; ');
        switch (command){
            case 'Add':
                members = members.split(', ');
                if (!bands.hasOwnProperty(bandName)) {
                    bands[bandName] = members;

                }
                else{
                    for (let member of members) {
                        if (!bands[bandName].includes(member)){
                            bands[bandName].push(member);
                        }
                    }
                }
                break;
            case 'Play':
                let time = +members;
                if (!bandTimes.hasOwnProperty(bandName)){
                    bandTimes[bandName] = time;
                }
                else {
                    bandTimes[bandName] = bandTimes[bandName] + time;
                }
                break;
            case 'start of concert':
                printTime(bandTimes);
                break;
            default:
                console.log(command);
                bands[command].forEach(e => console.log(`=> ${e}`));
                break;
        }
    }
    function printTime(bandTimesObj) {
        let bandTimesEntries = Object.entries(bandTimesObj)
            .sort((a,b) => {
                if (a[1] == b[1]){
                    return a[0].localeCompare(b[0]);
                }
                else{
                   return b[1] - a[1];
                }
            });
        let totalSum = 0;
        for (let bandTimesEntry of bandTimesEntries) {
            totalSum += +bandTimesEntry[1];
        }
        console.log(`Total time: ` + totalSum);
        bandTimesEntries.map(e => {
            console.log(`${e[0]} -> ${e[1]}`);
        });

    }
}
solve([ 'Play; The Beatles; 2584',
    'Add; The Beatles; John Lennon, Paul McCartney, George Harrison, Ringo Starr',
    'Add; Eagles; Glenn Frey, Don Henley, Bernie Leadon, Randy Meisner',
    'Play; Eagles; 1869',
    'Add; The Rolling Stones; Brian Jones, Mick Jagger, Keith Richards',
    'Add; The Rolling Stones; Brian Jones, Mick Jagger, Keith Richards, Bill Wyman, Charlie Watts, Ian Stewart',
    'Play; The Rolling Stones; 4239',
    'start of concert',
    'The Rolling Stones' ]);

/*
solve([ 'Add; The Beatles; John Lennon, Paul McCartney',
    'Add; The Beatles; Paul McCartney, George Harrison',
    'Add; The Beatles; George Harrison, Ringo Starr',
    'Play; The Beatles; 3698',
    'Play; The Beatles; 3828',
    'start of concert',
    'The Beatles' ])*/
