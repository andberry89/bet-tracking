const sortBets = bets => {
  bets.sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })
  return bets
}

export default sortBets
