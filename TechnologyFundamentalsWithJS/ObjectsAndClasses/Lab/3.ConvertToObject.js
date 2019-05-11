function solve(str) {
    let jsonObj = JSON.parse(str);
    let entries = Object.entries(jsonObj)
    for (const [key,value] of entries) {
        console.log(`${key}: ${value}`);
        
    }
    
}