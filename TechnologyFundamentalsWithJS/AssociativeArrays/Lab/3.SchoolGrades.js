function solve(input) {
    let students = new Map();
    for (const line of input) {
        let [name, ...gradesInput] = line.split(' ');
        grades = gradesInput.map(Number)

        if (students.has(name)) {
            grades = students.get(name).concat(grades);
        }
        students.set(name, grades);
    }

    let studentEntries = [...students.entries()];

    
    studentEntries.sort((a,b) => average(a,b)) //(average(a[1]) - average(b[1])));

    for (const line of studentEntries) {
        console.log(line[0] + ': ' + line[1].join(', '));
        
    }
        function average(a,b){
        aSum = 0;
        for (let i = 0; i < a[1].length; i++) {
            aSum += a[1][i];
        }

        bSum = 0;
        for (let i = 0; i < b[1].length; i++) {
            bSum+= b[1][i];
        }
        let Aaverage = aSum / a[1].length;
        let Baverage = bSum / b[1].length;

        return Aaverage - Baverage;
    }

    let average = grades => grades.reduce((a,b) => a + b) /grades.length;
}

solve(['Lilly 4 6 6 5',
    'Tim 5 6',
    'Tammy 2 4 3',
    'Tim 6 6']);