function solve(input) {
    let isPalindrome = false;
    let polindromes = [];
    for (let i = 0; i < input.length; i++) {
        let word = input[i].split(' ').join('')
        let reversedWord = word.split('').reverse(word).join('')
        if (word == reversedWord) {
            polindromes.push(word);
            isPalindrome = true;
        }
    }
    if (!isPalindrome) {
        console.log('No palindromes found');
    }
    else{
        console.log(polindromes.join(', '));
        
    }
}
solve(['stella won no wallets',
    'not a palindrome']
)