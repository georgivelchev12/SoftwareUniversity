function solve(input) {
  
    input.sort((a,b) => sortUsernames(a,b)).forEach(e => {
        return console.log(e);
        
    });
    function sortUsernames(a, b) {
        if(a.length != b.length) {
            return(a.length - b.length);
        } else {
            return a.localeCompare(b);
        }
    }

}
solve(["Denise",
"Ignatius",
"Iris",
"Isacc",
"Indie",
"Dean",
"Donatello",
"Enfuego",
"Benjamin",
"Biser",
"Bounty",
"Renard",
"Rot"]
)