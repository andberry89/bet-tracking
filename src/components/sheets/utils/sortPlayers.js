const sortPlayers = (option, players) => {
  let playersCopy = players

  const firstWord = option.split(' ')[0].toLowerCase()

  const sortByName = players => {
    players.sort((a, b) => {
      const x = a.displayName.toLowerCase()
      const y = b.displayName.toLowerCase()
      return y - x
    })

    return players
  }

  const sortByHitRate = players => {
    players.sort((a, b) => {
      return b.hitRate - a.hitRate
    })

    return players
  }

  const sortByPicks = players => {
    players.sort((a, b) => {
      return b.appearances - a.appearances
    })

    return players
  }

  switch (firstWord) {
    case 'player':
      playersCopy = sortByName(playersCopy)
      break
    case 'hit':
      playersCopy = sortByHitRate(playersCopy)
      break
    case 'picks:':
      playersCopy = sortByPicks(playersCopy)
      break
  }

  if (option.endsWith('A') || option.endsWith('High')) {
    playersCopy.reverse()
  }

  return playersCopy
}

export default sortPlayers
