furniture = (arr) => {
    let totalPrice = 0;
    console.log('Bought furniture:')
    arr.forEach(e => {
        let pattern = />>(?<name>[A-Za-z]+)<<(?<price>[0-9]+|[0-9]+\.[0-9]+)!(?<quantity>[0-9]+)/g
        if ((validLine = pattern.exec(e)) !== null) {
            let nameFurniture = validLine.groups.name;
            let price = validLine.groups.price;
            let quantity = validLine.groups.quantity;
            totalPrice += price * quantity;;
            console.log(nameFurniture);
        }
    });
    console.log(`Total money spend: ${totalPrice.toFixed(2)}`)
}

furniture(['>>Sofa<<312.23!3', '>>TV<<300!5', '>Invalid<<!5', 'Purchase']);