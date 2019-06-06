function solve(number) {
    let output = '';
    for (let i = 0; i < number; i++) {
        for (let j = 0; j < number; j++) {
            output+=number +' ';
        }
        console.log(output);
        output = '';
        
    }
}
solve(2);