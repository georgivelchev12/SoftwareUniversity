function solve(input) {
    let map = new Map();
    let arr = input.split(' ').map(element => element.toLowerCase())
    
    for (let word of arr) {
        if (!map.has(word)) {
            map.set(word,1);
        }
        else {
            map.set(word,map.get(word)+1);
        }
    }

    let mapEntries = [...map.entries()];

    let result = '';
    for (const [key,value] of mapEntries) {
        if (value%2!==0) {
            result += key + ' '
        }
    }
    console.log(result);
}

solve('Java C# Php PHP Java PhP 3 C# 3 1 5 C#');