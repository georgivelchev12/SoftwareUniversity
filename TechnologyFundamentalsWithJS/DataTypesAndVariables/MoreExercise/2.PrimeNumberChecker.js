function solve(n) {
  let isPrime = true;
  for (let i = 2; i <= n / 2; ++i) {
    if (n % i == 0) {
      isPrime = false;
      break;
    }
  }
  if (isPrime) {
    console.log('true');
  }
  else {
    console.log('false');
  }
}
solve(19);