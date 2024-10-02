const calcRR = n => {
  // take the number of legs and determine the different round robin combinations there are
  // use n choose k
  // n! / k!(n-k)!

  if (n < 3) {
    return null
  }

  // compute the factorial
  const factorial = num => {
    if (num === 0 || num === 1) return 1
    for (let i = num - 1; i >= 1; i--) {
      num *= i
    }
    return num
  }

  // compute it once rather than every time
  const nFact = factorial(n)

  // compute the n choose k computation
  const nChooseK = (n, k) => {
    return nFact / (factorial(k) * factorial(n - k))
  }

  // get possible values for k
  let k = []
  for (let i = 2; i < n; i++) {
    k.push(i)
  }

  let rr = []
  k.forEach(val => {
    rr.push({
      choose: val,
      combos: nChooseK(n, val),
    })
  })

  return rr
}

export default calcRR
