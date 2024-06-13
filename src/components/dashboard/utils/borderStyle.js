const borderStyle = bet => {
  if (bet.void) {
    return 'void-bet'
  }
  if (!bet.settled) {
    return bet.future ? 'future-bet' : 'pending-bet'
  } else {
    return bet.won ? 'winning-bet' : 'losing-bet'
  }
}

export default borderStyle
