function solve(arr) {
    let pattern = /([#$%*&])\w*\1=\d+!!.+\b/g;
    for (const element of arr) {
        let [name, hash] = element.split('=');
        if (hash == undefined) {
            console.log("Nothing found!");
        }
        else {
            let indexOfMarks = hash.indexOf('!!');
            let geohashCode = hash.substring(indexOfMarks + 2, hash.length)
            let geohashLength = +hash.substring(0, indexOfMarks);

            if (element.match(pattern)
                && geohashCode.length == geohashLength) {
                name = name.slice(1, name.length - 1);
                geohashCode = geohashCode.split('')
                .map(x => String.fromCharCode(x.charCodeAt(0) + geohashLength))
                .join('')
                console.log(`Coordinates found! ${name} -> ${geohashCode}`);
                break;
            }
            else {
                console.log(`Nothing found!`);
            }
        }
    }
}
solve(['Ian6Hutchinson=7!!\\(58ycb4',
    '#MikeHailwood#!!\'gfzxgu6768=11',
    'slop%16!!plkdek/.8x11ddkc',
    '$Steve$=9Hhffjh',
    '*DavMolyneux*=15!!efgk#\'_$&UYV%h%',
    'RichardQ^uayle=16!!fr5de5kd']);
