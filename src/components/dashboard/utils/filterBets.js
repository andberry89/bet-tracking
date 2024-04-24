const filterBets = (bets, filter, options) => {
  let filteredBets = bets

  switch (filter) {
    case 'all':
      filteredBets = bets
      break
    case 'open':
      filteredBets = bets.filter(bet => bet.settled === false)
      break
    case 'settled':
      filteredBets = bets.filter(bet => bet.settled === true)
      break
    case 'won':
      filteredBets = bets.filter(bet => bet.settled === true && bet.won === true)
      break
    case 'lost':
      filteredBets = bets.filter(bet => bet.settled === true && bet.won === false)
      break
    default:
      filteredBets = bets
      break
  }

  options.forEach(option => {
    filteredBets = filteredBets.filter(bet => bet[option] === true)
  })

  return filteredBets
}

export default filterBets
