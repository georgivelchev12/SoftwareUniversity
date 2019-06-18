function feedTheAnimals(arr) {
    let animals = [];
    arr.forEach((element) => {
        let animalObj = {};
        let areaObj = {};
        let [command, animalName, food, area] = element.split(':');
        food = +food;
        switch (command) {
            case 'Add':
                if (!animals.find(x => x['name'] === animalName)) {
                    animalObj['name'] = animalName;
                    animalObj['food'] = food;
                    animalObj['area'] = area;
                    animals.push(animalObj);
                } else {
                    let animalNameFinder = animals.find(x => x['name'] === animalName);
                    if (animalNameFinder) {
                        let addFood = animalNameFinder['food'];
                        addFood += food;
                        animalNameFinder['food'] = addFood;
                    }
                }
                break;
            case 'Feed':
                let animalNameFind = animals.find(x => x['name'] === animalName);
                if (animalNameFind) {
                    let indexOfFeededAnimal = animals.indexOf(animalNameFind);
                    let subtractFood = animalNameFind['food'];
                    subtractFood -= food;
                    animalNameFind['food'] = subtractFood;
                    if (subtractFood <= 0) {
                        animals.splice(indexOfFeededAnimal, 1);
                        console.log(`${animalName} was successfully fed`);
                    }
                }
                break;
            case 'Last Info':
                printResult(animals);
                break;
        }
    });

    function printResult(arr) {
        arr.sort((a, b) => b['food'] === a['food']
            ? a['name'].localeCompare(b['name'])
            : b['food'] - a['food']);
            for (const line of arr) {
                console.log(line['area']);
                
            }
        let countOfArea = {};
        let sortedArr = arr.sort((a, b) => {
            if (a['area'].length > b['area'].length) {
                
                return -1;
            }
            else if(a['area'].length < b['area'].length){
                return 1;
            }
        })
        let noFedAreaArr = [];
        console.log('Animals:');
        for (let arrElement of arr) {
            console.log(arrElement['name'] + ' -> ' + arrElement['food'] + 'g');
            noFedAreaArr.push(arrElement['area']);
        }
        let count = {};
        noFedAreaArr.forEach(x => count[x] = (count[x] || 0) + 1);
        console.log(`Areas with hungry animals:`);
        count = Object.entries(count)
            .sort((a, b) => b[1] === a[1] ? b[0].localeCompare(a[0]) : b[1] > a[1]);
        for (let countElement of count) {
            console.log(`${countElement[0]} : ${countElement[1]}`);
        }
    }
}

feedTheAnimals([ 'Add:Maya:7600:WaterfallArea',
'Add:Bobbie:6570:DeepWoodsArea',
'Add:Adam:4500:ByTheCreek',
'Add:Jamie:1290:RiverArea',
'Add:Gem:8730:WaterfallArea',
'Add:Maya:1230:WaterfallArea',
'Add:Jamie:560:RiverArea',
'Feed:Bobbie:6300:DeepWoodsArea',
'Feed:Adam:4650:ByTheCreek',
'Feed:Jamie:2000:RiverArea',
'Last Info' ]
);