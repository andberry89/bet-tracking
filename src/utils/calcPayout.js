const calcPayout = (odds, wager) => {
  if (odds > 99.99) {
    return ((odds / 100) * wager).toString()
  } else if (odds < -100) {
    return ((100 / Math.abs(odds)) * wager).toString()
  } else {
    return '0'
  }
}

export default calcPayout
