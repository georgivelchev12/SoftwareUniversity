function solve(arr) {
    let studentObj = {};
    for (const line of arr) {
        let splitedLine = line.split(': ').join(' ').split(', ');
        let name = splitedLine[0].split(' ')[2]
        let grade = +splitedLine[1].split(' ')[1] +1
        let averageScore = +splitedLine[2].split(' ')[5]
        if (averageScore > 3) {
            if (!studentObj.hasOwnProperty(grade)) {
                
                studentObj[grade] = [{'name':name,'averageScore':averageScore}];
            }
            else {
                studentObj[grade].push({'name':name,'averageScore':averageScore});
            }
        }
    }
    let objEntries = Object.entries(studentObj)
    .sort((a,b) => a[0] - b[0]);
    let names = [];
    let sum = 0;
    let average = 1;
    let counter = 0;
    for (const student of objEntries) {
        console.log(`${student[0]} Grade `);
        
        for (const line of student[1]) {
            names.push(Object.entries(line)[0][1]);
            let score = Object.entries(line)[1][1];
            sum += score;
            counter++;
            
        }
        average = sum/counter;
        console.log(`List of students: ${names.join(', ')}`)
       console.log(`Average annual grade from last year: ${average.toFixed(2)}`);
       console.log();
       
        names.splice(0,names.length);
        sum = 0;
        average = 1;
        counter = 0;
    }

}
solve(["Student name: Mark, Grade: 8, Graduated with an average score: 4.75",
    "Student name: Ethan, Grade: 9, Graduated with an average score: 5.66",
    "Student name: George, Grade: 8, Graduated with an average score: 2.83",
    "Student name: Steven, Grade: 10, Graduated with an average score: 4.20",
    "Student name: Joey, Grade: 9, Graduated with an average score: 4.90",
    "Student name: Angus, Grade: 11, Graduated with an average score: 2.90",
    "Student name: Bob, Grade: 11, Graduated with an average score: 5.15",
    "Student name: Daryl, Grade: 8, Graduated with an average score: 5.95",
    "Student name: Bill, Grade: 9, Graduated with an average score: 6.00",
    "Student name: Philip, Grade: 10, Graduated with an average score: 5.05",
    "Student name: Peter, Grade: 11, Graduated with an average score: 4.88",
    "Student name: Gavin, Grade: 10, Graduated with an average score: 4.00"]
)