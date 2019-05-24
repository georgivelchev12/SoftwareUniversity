function solve(arr) {
    let beginnerQuests = arr.shift().split(', ');
    for (let i = 0; i < arr.length; i++) {
        let [command,quest] = arr[i].split(' - ');
        let indexOfQuest = 0;
        switch (command) {
            case 'Start':
                if (!beginnerQuests.includes(quest)) {
                    beginnerQuests.push(quest);
                }
                break;
            case 'Complete':
                if (beginnerQuests.includes(quest)) {
                    indexOfQuest = beginnerQuests.indexOf(quest)
                    beginnerQuests.splice(indexOfQuest,1);
                }
                break;
                case 'Side Quest':
                quest = quest.split(':');
                let sideQuest = quest[1];
                if (beginnerQuests.includes(sideQuest)) {
                    break;
                }
                if (beginnerQuests.includes(quest[0])) { 
                    indexOfQuest = beginnerQuests.indexOf(quest[0])
                    beginnerQuests.splice(indexOfQuest+1,0,sideQuest);
                }
                
                break;
                case 'Renew':
                    if (beginnerQuests.includes(quest)) {
                        indexOfQuest = beginnerQuests.indexOf(quest);
                        beginnerQuests.splice(indexOfQuest,1);
                        beginnerQuests.push(quest);
                    }
                break;
            case 'Retire!':
                console.log(beginnerQuests.join(', '));
                return;
        }     
    }
}


solve(['Hello World, If else',
'Complete - Homework',
'Side Quest - If else:Switch',
'Side Quest - If else:Switch',
'Renew - Hello World',
'Retire!']);

// solve(['Hello World, For loop, If else',
// 'Start - While loop',
// 'Complete - For loop',
// 'Retire!'])