solve = (arr) => {
    let childrenNamesObj = {};
    let giftsObj = {};
    arr.forEach(element => {
        let [name, gift, giftNumber] = element.split('->');
        giftNumber = Number(giftNumber);
        if (name !== 'END' && name !== 'Remove') {
            if (!childrenNamesObj.hasOwnProperty(name)) {
                childrenNamesObj[name] = giftNumber;
            } else {
                childrenNamesObj[name] += giftNumber;
            }
            if (!giftsObj.hasOwnProperty(gift)) {
                giftsObj[gift] = giftNumber;
            } else {
                giftsObj[gift] += giftNumber;
            }
        } else if (name === 'Remove') {
            delete childrenNamesObj[gift]
        } else if (name === 'END') {
            console.log('Children:');
            Object.entries(childrenNamesObj).sort((a, b) =>
                a[1] === b[1]
                    ? a[0].localeCompare(b[0])
                    : b[1] - a[1]).map(child => console.log(`${child[0]} -> ${child[1]}`));
            console.log('Presents:');
            Object.entries(giftsObj)
                .map(child => console.log(`${child[0]} -> ${child[1]}`));
        }
    });
};
solve(['Teddy->Clothes->8',
    'Johny->Toys->10',
    'Freddie->Candy->30',
    'Johny->Candy->20',
    'Carrie->Phone->1',
    'Carrie->Tablet->1',
    'Carrie->Candy->10',
    'Teddy->Toys->5',
    'Remove->Teddy',
    'END']
);