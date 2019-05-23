function solve(input) {
    let storage = new Map();

    for (let i = 0; i < input.length; i++) {
        let [product, quantity] = input[i].split(' ');
        quantity = +quantity;

        if (storage.has(product)) {
            quantity += storage.get(product)
        }
        storage.set(product,quantity)
    }
    for (const key of storage) {
        console.log(key[0]+ ' -> ' + key[1]);
        
    }
    //storage.forEach((v,k) => console.log(`${k} -> ${v}`))
}
solve(['tomatoes 10',
    'coffee 5',
    'olives 100',
    'coffee 40']
)
