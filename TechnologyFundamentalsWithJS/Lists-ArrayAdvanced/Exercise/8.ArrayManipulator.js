function arrayManipulator(inputNumbers, commandArr) {
    for (const element of commandArr) {
        let splitedElement = element.split(' ');
        let command = splitedElement.shift();
        switch (command) {
            case 'add':
                let addIndex = +splitedElement[0];
                let addElement = +splitedElement[1];
                inputNumbers.splice(addIndex, 0, addElement)
                break;
            case 'addMany':
                let addManyIndex = +splitedElement.shift();
                let addElements = splitedElement.map(Number);
                for (let i = addElements.length-1; i >= 0; i--) {
                    inputNumbers.splice(addManyIndex,0,addElements[i]);
                }
                break;
            case 'contains':
                let containsIndex = +splitedElement[0];
                if (inputNumbers.includes(containsIndex)) {
                    console.log(inputNumbers.indexOf(containsIndex));
                }
                else {
                    console.log(-1);
                }
                break;
            case 'remove':
                let removeIndex = +splitedElement[0];
                inputNumbers.splice(removeIndex, 1);
                break;
            case 'shift':
                let shiftIndex = +splitedElement[0];
                for (let i = 0; i < shiftIndex; i++) {
                    let shifted = inputNumbers.shift();
                    inputNumbers.push(shifted);
                }
                break;
            case 'sumPairs':
                // let sum = 0;
                // let num1 = [];
                // let num2 = [];
                // for (let i = 0; i < inputNumbers.length; i++) {
                //    num1 = inputNumbers.shift();
                //    num2= inputNumbers.shift();
                //    if (num2 == undefined) {
                //        sum = num1;
                //    }else{
                //    sum= num1+num2;
                //    }
                //    inputNumbers.push(sum);
                // }
                // inputNumbers = inputNumbers.map((e,i,arr)=>
                //  i< arr.length - 1 ? 
                //  (arr[i] += arr[i + 1]) : 
                //  arr[i] = arr[i])
                //  .filter((e, i) => i % 2 === 0);
                inputNumbers = inputNumbers.map(function(e,i,arr){
                    if (i < arr.length-1) {
                      return arr[i] += arr[i + 1]
                    }else {
                       return arr[i] = arr[i]
                    }
                }).filter((e,i) => i%2===0);
                
                break;
            case 'print':
                console.log(inputNumbers);
                break;
        }
    }
}