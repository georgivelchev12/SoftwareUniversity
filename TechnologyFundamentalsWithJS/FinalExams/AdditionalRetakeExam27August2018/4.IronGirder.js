ironGirder = (arr) => {
    let result = {};
    arr.forEach(elem => {
        let destination = elem.split(':')[0];
        if(destination !== 'Slide rule'){
            let [time, passengers] = elem.split(':')[1].split('->');
            passengers = +passengers;
            if (time === 'ambush') {
                if (destination in result) {
                    result[destination].time = 0;
                    result[destination].passengers -= passengers;
                }
            }
            else {
                time = +time;
                if (!(destination in result)) {
                    result[destination] = {
                        time: time,
                        passengers: passengers
                    }
                }
                else {
                    result[destination].passengers += passengers;
                    if (result[destination].time > time
                        || result[destination].time === 0) {
                        result[destination].time = time;
                    }
                }
            }
        }
        
    });
    Object.entries(result)
        .sort((a, b) => {
            if (a[1].time == b[1].time) {
                return a[0].localeCompare(b[0]);
            }
            else {
                return a[1].time - b[1].time;
            }
        }).filter(a => a[1].time > 0 && a[1].passengers)
        .map(elem => {
            console.log(`${elem[0]} -> Time: ${elem[1].time} -> Passengers: ${elem[1].passengers}`)
        })
};
ironGirder(['Sto-Lat:8->120',
    'Ankh-Morpork:3->143',
    'Sto-Lat:9->80',
    'Ankh-Morpork:4->143',
    'Sto-Lat:3->20',
    'Quirm:12->40',
    'Quirm:13->29',
    'Slide rule']);