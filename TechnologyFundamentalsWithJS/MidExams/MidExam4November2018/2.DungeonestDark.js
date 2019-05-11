function solve(input) {
    let initialHealth = 100;
    let initialCoins = 0;

    let counter = 0;
    let room = input[0].split('|');
    for (let i = 0; i < room.length; i++) {
        let splited = room[i].split(' ');
        let command = splited[0];
        let number = +splited[1];
        counter++;
        switch (command) {
            case 'potion':
            let currentHealth = initialHealth;
            initialHealth+=number;
                if (initialHealth > 100) {
                console.log(`You healed for ${100-currentHealth} hp.`);
                console.log(`Current health: 100 hp.`);
                initialHealth = 100;
                }
                else{
                console.log(`You healed for ${number} hp.`);
                console.log(`Current health: ${initialHealth} hp.`);
                }
                break;
            case 'chest':
            initialCoins += number;
                console.log(`You found ${number} coins.`);
            break;
            default:
                initialHealth-=number;
                if (initialHealth > 0) {
                    console.log(`You slayed ${command}.`);
                    
                }
                if (initialHealth <= 0) {
                    console.log(`You died! Killed by ${command}.`);
                    console.log(`Best room: ${i+1}`);
                    return; 
                }
                break;
        }
    }


    if (room.length == counter) {
        console.log(`You've made it!`);
        console.log(`Coins: ${initialCoins}`);
        console.log(`Health: ${initialHealth}`);
        
    }
}
solve(["cat 10|potion 30|orc 10|chest 10|snake 25|chest 110"])