const calcPayout = (odds, wager) => {
  if (odds > 99.99) {
    return ((odds / 100) * wager).toFixed(2)
  } else if (odds < -100) {
    return ((100 / Math.abs(odds)) * wager).toFixed(2)
  } else {
    return '0'
  }
}

export default calcPayout
