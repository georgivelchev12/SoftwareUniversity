function lastKNumbersSequence(n, k) {
    let result = [1];
    for (let i = 1; i < n; i++) {
        // let index = i - k;
        // if (index < 0) {
        //     index = 0;
        // }

        let index = Math.max(i-k,0);
        let subArr = result.slice(index);
        
        //let sum = 0;
        // for (let num of subArr) {
        //     sum+=num;
        // }

        let sum = subArr.reduce((a,b) => a+b)
        result.push(sum);
    }
   console.log(result.join(' '));
   
}