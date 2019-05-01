function solve(arr) {
    let rowSum = 0;
    let colSum = 0;
    let magic = false;
        for (let rows = 0; rows < arr.length; rows++) {
            rowSum+= arr[0][rows] + arr[1][rows] + arr[2][rows];
            for (let cols = 0; cols < arr.length; cols++) {
                 colSum+= arr[rows][cols];
            }
            if (rowSum == colSum) {
                magic = true;
            }
            else {
                magic = false;
                break;
            }
        }
        console.log(magic);
        

}