function feedTheAnimals(arr) {
    let hungryAnimalsObj = {};
    let areasObj = {};
    arr.forEach((element) => {
        let [command, animalName, dailyFoodLimit, area] = element.split(':');
        dailyFoodLimit = Number(dailyFoodLimit);
        switch (command) {
            case 'Add':
                if (!hungryAnimalsObj.hasOwnProperty(animalName)) {
                    hungryAnimalsObj[animalName] = dailyFoodLimit;
                    if (!areasObj.hasOwnProperty(area)) {
                        areasObj[area] = [animalName];
                    } else {
                        areasObj[area].push(animalName);
                    }
                } else {
                    hungryAnimalsObj[animalName] += dailyFoodLimit
                }
                break;
            case 'Feed':
                if (hungryAnimalsObj.hasOwnProperty(animalName)) {
                    if (hungryAnimalsObj[animalName] <= dailyFoodLimit) {
                        delete hungryAnimalsObj[animalName];
                        areasObj[area].splice(areasObj[area].indexOf(animalName), 1);
                        console.log(`${animalName} was successfully fed`);
                    } else {
                        hungryAnimalsObj[animalName] -= dailyFoodLimit;
                    }
                }
                break;
            case 'Last Info':
                printResult(hungryAnimalsObj, areasObj);
                break;
        }
    });

    function printResult(obj1, obj2) {
        console.log('Animals:');
        Object.entries(obj1)
            .sort((a, b) => a[1] === b[1] ? a[0].localeCompare(b[0]) : b[1] - a[1])
            .forEach(element => console.log(`${element[0]} -> ${element[1]}g`));

        console.log('Areas with hungry animals:');
        Object.entries(obj2)
            .sort((a, b) => b[1].length - a[1].length)
            .forEach(element => {
                if (element[1].length > 0) {
                    console.log(`${element[0]} : ${element[1].length}`);
                }
            });
    }
}

feedTheAnimals(['Add:Maya:7600:WaterfallArea',
    'Add:Bobbie:6570:DeepWoodsArea',
    'Add:Adam:4500:ByTheCreek',
    'Add:Jamie:1290:RiverArea',
    'Add:Gem:8730:WaterfallArea',
    'Add:Maya:1230:WaterfallArea',
    'Add:Jamie:560:RiverArea',
    'Feed:Bobbie:6300:DeepWoodsArea',
    'Feed:Adam:4650:ByTheCreek',
    'Feed:Jamie:2000:RiverArea',
    'Last Info']
);