function passwordValidation(password) {
    let isValid = true;
    let digits = 0;
    let isWithIncorectElement = false;
    if (password.length < 6 || password.length > 10) {
        console.log("Password must be between 6 and 10 characters");
        isValid = false;  
    }
    password = password.toLowerCase();
    
    for (let index in password) {
        let asciElement = password.charCodeAt(index);
        if (asciElement >= 48 && asciElement <= 57) {
            digits++;
        }
        if((asciElement < 48 || asciElement > 57) 
          &&(asciElement < 97 || asciElement > 122)){
            isWithIncorectElement = true;
        }
    }
    if (isWithIncorectElement) {
        console.log("Password must consist only of letters and digits");
        isValid = false;
    }
    if (digits<2) {
        console.log("Password must have at least 2 digits");
        isValid = false;
    }
    if (isValid == true) {
        console.log('Password is valid');
        
    }
}