function subtract() {
    let firstNum = Number(document.querySelector("#firstNumber").value);
    let secondNum = Number(document.querySelector("#secondNumber").value);
    let result = document.getElementById('result');
    result.textContent = firstNum - secondNum;

}