function solve(number) {
    let converter = "";

    for (let i = 0; i < number; i++) {
        for (let k = 0; k < number; k++) {
            for (let x = 0; x < number; x++) {
                console.log(String.fromCharCode(97 + i) + String.fromCharCode(97+k) + String.fromCharCode(97 + x));
                
                
            }
        }
    }
}
