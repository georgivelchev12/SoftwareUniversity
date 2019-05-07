function distinctArray(arr) {
    let uniqueElements = [];
    for (let element of arr) {
        if (!uniqueElements.includes(element)) {
            uniqueElements.push(element);
        }
        else {
            continue;
        }
    }
    console.log(uniqueElements.join(' '));
    
}