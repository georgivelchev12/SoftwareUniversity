function solve(num) {
    let days = ["Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"];

    if (num >=1 && num<=7) {
        if (num == 1) {
            console.log(days[0]);          
        }
        else if (num == 2) {
            console.log(days[1]);
        }
        else if (num == 3) {
            console.log(days[2]);
        }
        else if (num == 4) {
            console.log(days[3]);
        }
        else if (num == 5) {
            console.log(days[4]);
        }
        else if (num == 6) {
            console.log(days[5]);
        }
        else if (num == 7) {
            console.log(days[6]);
        }
        
    }
    else{
        console.log("Invalid day!");
        
    }
}