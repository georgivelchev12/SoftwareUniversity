function solve(input) {
    let line = input.split(' ')
    let keyMaterial = new Map();
    keyMaterial.set('shards', 0)
    keyMaterial.set('fragments', 0)
    keyMaterial.set('motes', 0)

    let notKeyMaterial = new Map();

    let win = ''

    for (let i = 0; i < line.length; i+=2) {
        let material = line[i+1].toLowerCase();
        let quantity = +line[i];


        if (keyMaterial.has(material)) {
            quantity = quantity + keyMaterial.get(material);
            keyMaterial.set(material, quantity);

            if (keyMaterial.get(material) >= 250) {
                win = material;
                keyMaterial.set(material, quantity - 250);
                if (win == 'motes') {
                    win = 'Dragonwrath'
                    console.log(`${win} obtained!`);
                    
                }
                else if (win == 'fragments') {
                    win = 'Valanyr'
                    console.log(`${win} obtained!`);
                    
                }
                else if (win == 'shards') {
                    win = 'Shadowmourne'
                    console.log(`${win} obtained!`);
                    
                }
                break;
            }
            continue;
        }
        else {
            if (!notKeyMaterial.has(material)) {
                notKeyMaterial.set(material, 0)
            }
            notKeyMaterial.set(material,notKeyMaterial.get(material) + quantity)
        }
    }

  
    let keyMaterialEntries = [...keyMaterial.entries()]
        .sort((a, b) => {
            if (a[1] == b[1]) {
                return a[0].localeCompare(b[0])
            }
            return b[1] - a[1];
        });

    let notKeyMaterialEntries = [...notKeyMaterial.entries()]
        .sort((a,b) => a[0].localeCompare(b[0]))

    for (const [material, quantity] of keyMaterialEntries) {
        console.log(`${material}: ${quantity}`);
    }
    for (const [material, quantity] of notKeyMaterialEntries) {
        console.log(`${material}: ${quantity}`);
    }



    // function obtainWord(win) {
    //     switch (win) {
    //         case 'motes': return 'Dragonwrath';
    //         case 'fragments': return 'Valanyr';
    //         case 'shards': return 'Shadowmourne';
    //         default: break;
    //     }
    // }
}

solve('3 Motes 5 stones 5 Shards 6 leathers 255 fragments 7 Shards')


// solve('123 silver 6 shards 8 shards 5 motes 9 fangs 75 motes 103 MOTES 8 Shards 86 Motes 7 stones 19 silver')