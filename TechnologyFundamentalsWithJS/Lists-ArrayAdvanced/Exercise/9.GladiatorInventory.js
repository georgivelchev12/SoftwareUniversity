function GladiatorInventory(inputArr) {
    let equipment = inputArr.shift().split(' ');
    for (let i = 0; i < inputArr.length; i++) {
        let splited = inputArr[i].split(' ');
        let command = splited[0];
        let currentEquipment = splited[1];
        let uprgradeElement = currentEquipment.split('-');
        switch (command) {
            case 'Buy':
                equipment.push(currentEquipment);
                break;
            case 'Trash':
                if (equipment.includes(currentEquipment)) {
                    let trashIndex = equipment.indexOf(currentEquipment);
                    equipment.splice(trashIndex, 1);
                }
                break;
                case 'Repair':
                    if (equipment.includes(currentEquipment)) {
                       let repairIndex = equipment.indexOf(currentEquipment)
                        equipment.splice(repairIndex,1);
                        equipment.push(currentEquipment);
                    }
                break;
                case 'Upgrade':
                    if (equipment.includes(uprgradeElement[0])) {
                        let upgradeIndex = equipment.indexOf(uprgradeElement[0])+1;
                        equipment.splice(upgradeIndex,0,`${uprgradeElement[0]}:${uprgradeElement[1]}`)
                    }
                break;
        }
    }
    console.log(equipment.join(' '));
    
}