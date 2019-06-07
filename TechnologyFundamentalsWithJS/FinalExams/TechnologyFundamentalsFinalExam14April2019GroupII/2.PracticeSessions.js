function solve(arr) {
    let racers = [];
    for (let arrElement of arr) {
        let [command, road, racer, nextRoad] = arrElement.split('->');
        switch (command) {
            case 'Add':
                let obj = {};
                let racersToFind = racers.find(x => x.road == road);
                if (!racersToFind) {
                    obj['road'] = road;
                    obj['racer'] = [racer];
                    racers.push(obj);
                } else {
                    racersToFind['racer'].push(racer);
                }
                break;
            case 'Move':
                let findRacers = racers.find(x => x['racer'].includes(racer));
                if (findRacers) {
                    let indexOfRacer = findRacers['racer'].indexOf(racer);
                    findRacers['racer'].splice(indexOfRacer, 1);
                    if (racers.find(x => x.road == road)) {
                        let nextRoadFind = racers.find(x => x.road == nextRoad);
                        if (nextRoadFind){
                            nextRoadFind['racer'].push(racer);
                        }

                    }
                }
                break;
            case 'Close':
                let closeRoad = racers.find(x => x.road == road);
                let indexOfRoad = racers.indexOf(closeRoad);
                if (closeRoad) {
                    racers.splice(indexOfRoad, 1);
                }
                break;
            case 'END':
                sortAndPrint(racers);
                break;
        }
    }

    function sortAndPrint(arr) {
        let newObj = {};
        for (let obj of arr) {
            newObj[obj['road']] = obj['racer'];
        }
        let newObjEntries = Object.entries(newObj);
        newObjEntries.sort((a, b) => {
                if (b[1].length == a[1].length) {
                    return a[0].localeCompare(b[0]);
                } else {
                    return b[1].length - a[1].length;
                }
            }
        );
        console.log(`Practice sessions:`);
        for (let road of newObjEntries) {
            console.log(road[0]);
            for (let racers of road[1]) {
                console.log(`++${racers}`);
            }
        }
    }
}

solve(['Add->Glen Vine->Steve Hislop',
    'Add->Ramsey road->John McGuinness ',
    'Add->Glen Vine->Ian Hutchinson',
    'Add->Ramsey road->Dave Molyneux',
    'Move->Ramsey road->Hugh Earnsson->Glen Vine',
    'Add->A18 Snaefell mountain road->Mike Hailwood',
    'Add->Braddan->Geoff Duke',
    'Move->A18 Snaefell mountain road->Mike Hailwood->Braddan',
    'Move->Braddan->John McGuinness->Glen Vine',
    'Close->A18 Snaefell mountain road',
    'END']);