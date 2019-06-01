// function solve(obj, arr) {
//     for (const line of arr) {
//         let [command, tabs] = line.split(' ');
//         if (line == 'Clear History and Cache') {
//             obj['Open Tabs'] = [];
//             obj['Recently Closed'] = [];
//             obj['Browser Logs'] = [];
//             continue;
//         }
//         for (const browserCommands in obj) {
            
//             let browserCommand = browserCommands;
//             let tabNames = obj[browserCommand];
           
//             if (browserCommands == 'Open Tabs'
//                 && command == 'Open') {
//                 tabNames.push(tabs)
//             }
//             else if (browserCommands == 'Recently Closed'
//                 && command == 'Close'
//                 && obj['Open Tabs'].includes(tabs)) {
//                 tabNames.push(tabs);
//                 let indexOfTab = obj['Open Tabs'].indexOf(tabs)
//                 obj['Open Tabs'].splice(indexOfTab, 1)
//             }
//             else if (browserCommands == 'Browser Logs') {
//                 tabNames.push(line);
//             }
//         }
//     }
//     for (const key in obj) {
//         if (key != 'Browser Name') {
//             console.log(`${key}: ${obj[key].join(', ')}`);
//         }
//         else {
//             console.log(obj[key]);

//         }
//     }
// }


//Second way

function solve(input, actions) {
    let output = input;
    for (let action of actions) {
        if (action.includes('Close ')) {
            let nameSite = action.split('Close ')[1];
            if (output['Open Tabs'].includes(nameSite)) {
                output['Open Tabs'].splice(output['Open Tabs'].indexOf(nameSite), 1);
                output['Recently Closed'].push(nameSite);
                output['Browser Logs'].push(action);
            }
        } else if (action.includes('Open ')) {
            let nameSite = action.split('Open ')[1];
            output['Open Tabs'].push(nameSite);
            output['Browser Logs'].push(action);
        } else if (action === 'Clear History and Cache') {
            output['Open Tabs'] = [];
            output['Recently Closed'] = [];
            output['Browser Logs'] = [];
        }
    }
    let result = Object.entries(output);

    result.forEach(element => {
        if (element[0] === 'Browser Name') {
            console.log(element[1]);
        } else {
            console.log(`${element[0]}: ${element[1].join(', ')}`);
        }
    });
}


solve({"Browser Name":"Google Chrome",
"Open Tabs":["Facebook","YouTube","Google Translate"],
"Recently Closed":["Yahoo","Gmail"],
"Browser Logs":["Open YouTube","Open Yahoo","Open Google Translate","Close Yahoo","Open Gmail","Close Gmail","Open Facebook"]},
["Close Facebook", "Open StackOverFlow", "Open Google"]
)


// solve({
//     "Browser Name": "Mozilla Firefox",
//     "Open Tabs": ["YouTube"],
//     "Recently Closed": ["Gmail", "Dropbox"],
//     "Browser Logs": ["Open Gmail", "Close Gmail", "Open Dropbox", "Open YouTube", "Close Dropbox"]
// },
//     ["Open Wikipedia", "Clear History and Cache", "Open Twitter"])