function solve(input) {
    let inventory = [];

    for (let inputRow of input) {
        let [name,level,items]=inputRow.split(" / ");
        level = +level;
        items = items.split(', ');

        inventory.push({
            name:name,
            level:level,
            items:items
        })
    }
    let sortedInventory = inventory.sort((a,b) => a['level'] - b['level']);
    for (const item of sortedInventory) {
        item['items'] = item['items'].sort((a,b) => a.localeCompare(b));
        console.log(`Hero: ${item['name']}\nlevel => ${item['level']}\nitems => ${item['items'].join(', ')}`)
    }
}

solve(["Isacc / 25 / Apple, GravityGun",
    "Derek / 12 / BarrelVest, DestructionSword",
    "Hes / 1 / Desolator, Sentinel, Antara"]
)