solve = (arr) => {
    let resultCounter = {}
    let result = {};
    let checkLang = (lang) =>{
        if(resultCounter[lang] === undefined){
            resultCounter[lang] = 1;
        }
        else{
            resultCounter[lang]++;
        }
    }
    arr.forEach(elem => {
        let [name,language,points] = elem.split('-');
            if(points !== undefined){
                points = +points;
                if(!(name in result)){
                    result[name] ={
                        points:points,
                        language:language
                    }
                    checkLang(language)
                }
                else {
                    if(result[name].points < points){
                        result[name].points = points;
                    }
                    checkLang(language);
                }
            }
            else{
                if(name in result){
                    delete result[name];
                }
            }
    
    });
    console.log('Results:')
    Object.entries(result).sort((a,b) => {
        if(a[1].points == b[1].points){
            return a[0].localeCompare(b[0]);
        } else {
            return b[1].points - a[1].points;
        }
    }).map(e => console.log(`${e[0]} | ${e[1].points}`))

    console.log('Submissions:')
    Object.entries(resultCounter).sort((a,b) => {
        if(a[1] === b[1]){
            return a[0].localeCompare(b[0]);
        } else {
            return b[1] - a[1];
        }
    }).map(e => console.log(`${e[0]} - ${e[1]}`))
}
solve([ 'Pesho-Java-91',
'Gosho-C#-84',
'Kiro-JavaScript-90',
'Kiro-C#-50',
'Kiro-banned',
'exam finished' ]
);