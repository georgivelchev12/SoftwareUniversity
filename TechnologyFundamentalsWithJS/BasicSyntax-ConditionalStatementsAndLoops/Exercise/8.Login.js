function Login(inputArray){
    var userName = inputArray.shift();

    var password = "";
    var counter = 0;
    for(let i = userName.length-1;i>=0;i--){
       password += userName[i]; 

    }
    
    for(let i = 0;i< inputArray.length;i++){
        if(inputArray[i] == password){
            console.log(`User ${userName} logged in.`);
            break;
        }else{
            if(i == 3){
                console.log(`User ${userName} blocked!`);
                break;
            }
            console.log(`Incorrect password. Try again.`)
        }
    }

}