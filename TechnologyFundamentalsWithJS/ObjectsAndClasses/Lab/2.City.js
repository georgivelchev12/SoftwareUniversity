function city(name,area,population,country,postCode) {
    let person = {
        name,
        area,
        population,
        country,
        postCode
    }
    let entries = Object.entries(person)
    for (const pair of entries) {
        console.log(`${pair[0]} -> ${pair[1]}`);
        
    }
}