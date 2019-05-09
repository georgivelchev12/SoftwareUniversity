function solve(number) {
    let currentColor = 'black';
    let previusColor = '';
    console.log("<div class=\"chessboard\">");
    
    for(let i = 1;i<=number;i++){
        console.log("   <div>");
        
        for(let j = 1;j<=number;j++){
            console.log(`      <span class="${currentColor}"></span>`);
            previusColor = currentColor;
            currentColor = previusColor === 'black' ? 'white' : 'black'
        }
        console.log("   </div>");
        if (number%2===0) {
            previusColor = currentColor;
            currentColor = previusColor === 'black' ? 'white' : 'black'
        }
        
    }
    console.log("</div>");  
}
