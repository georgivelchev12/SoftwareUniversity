function searchForNumber(firstArr, secondArr) {
    let numOfElements = secondArr.shift();
    let deleteNumber = secondArr.shift();
    let searchNum = secondArr.shift();

    firstArr = firstArr.splice(0,numOfElements);
    firstArr.splice(0, deleteNumber);
    let counter = 0;
    for (let i = 0; i < firstArr.length; i++) {
        if (firstArr[i]==searchNum) {
            counter++;
        }
    }
    console.log(`Number ${searchNum} occurs ${counter} times.`);
}