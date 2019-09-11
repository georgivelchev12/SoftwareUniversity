solve = (input) => {
    let totalPrice = 0;
    let totalIncome = 0;
    for (let i = 0; i < input.length; i++) {
        let pattern = /%(?<name>[A-Z][a-z]+)%[^$%|.]{0,}<(?<product>[\w]+)>[\D^$%|.]{0,}\|(?<count>[0-9]+)\|[\D^$%|.]{0,}(?<price>[0-9]+|[0-9]+\.[0-9]+)\$/g

        if (input[i] === 'end of shift') {
            console.log(`Total income: ${totalIncome.toFixed(2)}`)
        }
        let validLine;
        if ((validLine = pattern.exec(input[i])) !== null) {

            let name = validLine.groups['name'];
            let product = validLine.groups['product'];
            let count = validLine.groups['count'];
            let price = validLine.groups['price'];

            totalPrice = price * count;
            totalIncome += totalPrice;
            console.log(`${name}: ${product} - ${totalPrice.toFixed(2)}`);
        }

    }

}
solve(['%George%<Croissant>|2|10.3$',
    '%Peter%<Gum>|1|1.3$',
    '%Maria%<Cola>|1|2.4$',
    'end of shift'])