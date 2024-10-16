const mostUsedPlayers = players => {
  let max = 0
  players.forEach(player => {
    if (player.appearances > max) {
      max = player.appearances
    }
  })
  let favoritePlayers = players.filter(e => e.appearances === max)

  if (favoritePlayers.length <= 1) {
    max--
    while (players.filter(e => e.appearances === max).length === 0) {
      max--
    }
    favoritePlayers = favoritePlayers.concat(players.filter(e => e.appearances === max))
  }

  // sort by hit rate
  favoritePlayers.sort((a, b) => {
    return b.hitRate - a.hitRate
  })

  return favoritePlayers
}

const mostSuccessfulPlayers = players => {
  const hitRates = [...new Set(players.map(player => player.hitRate))].sort((a, b) => a - b).reverse()
  let mvps = players.filter(e => e.hitRate === hitRates[0])

  // Only want the ones with the highest appearances
  mvps = mostUsedPlayers(mvps)
  mvps.sort((a, b) => {
    let x = a.name.toLowerCase()
    let y = b.name.toLowerCase()

    if (x > y) return 1
    if (x < y) return -1
    return 0
  })

  if (mvps.length <= 1) {
    let nextRateDown = mostUsedPlayers(players.filter(e => e.hitRate === hitRates[1]))
    nextRateDown.sort((a, b) => {
      let x = a.name.toLowerCase()
      let y = b.name.toLowerCase()

      if (x > y) return 1
      if (x < y) return -1
      return 0
    })

    mvps = mvps.concat(nextRateDown)
  }

  return mvps
}

export { mostUsedPlayers, mostSuccessfulPlayers }

// TODO: CREATE NEW METHODS TO SORT PLAYERS
// TODO: EACH HIT RATE?
// TODO: CREATE A COMPONENT SO PERSON CAN CLICK PLAYER
// TODO: AND GET DETAILS ON THEIR HISTORY
