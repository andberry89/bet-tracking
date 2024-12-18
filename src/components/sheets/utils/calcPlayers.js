const getMostUsedPlayers = players => {
  let max = players.reduce((acc, value) => {
    return (acc = acc > value.appearances ? acc : value.appearances)
  }, 0)

  let mostUsedPlayers = players.filter(e => e.appearances === max)

  if (mostUsedPlayers.length <= 1) {
    max--
    while (players.filter(e => e.appearances === max).length === 0) {
      max--
    }
    mostUsedPlayers = mostUsedPlayers.concat(players.filter(e => e.appearances === max))
  }

  // sort by appearances
  mostUsedPlayers.sort((a, b) => {
    return b.appearances - a.appearances
  })

  return mostUsedPlayers
}

const getMostSuccessfulPlayers = players => {
  const hitRates = [...new Set(players.map(player => player.hitRate))].sort((a, b) => a - b).reverse()
  let mvps = players.filter(e => e.hitRate === hitRates[0])

  // Only want the ones with the highest appearances
  mvps = getMostUsedPlayers(mvps)

  mvps.sort((a, b) => {
    let x = a.appearances
    let y = b.appearances

    if (x > y) return -1
    if (x < y) return 1
    return 0
  })

  if (mvps.length <= 1) {
    let nextRateDown = getMostUsedPlayers(players.filter(e => e.hitRate === hitRates[1]))
    nextRateDown.sort((a, b) => {
      let x = a.displayName.toLowerCase()
      let y = b.displayName.toLowerCase()

      if (x > y) return 1
      if (x < y) return -1
      return 0
    })

    mvps = mvps.concat(nextRateDown).reverse()
  }

  return mvps
}

const getLeastSuccessfulPlayers = players => {
  const hitRates = [...new Set(players.map(player => player.hitRate))].sort((a, b) => a - b)
  let lvps = players.filter(e => e.hitRate === hitRates[0])

  // Only want the ones with the highest appearances
  lvps = getMostUsedPlayers(lvps)

  lvps.sort((a, b) => {
    let x = a.appearances
    let y = b.appearances

    if (x > y) return -1
    if (x < y) return 1
    return 0
  })

  if (lvps.length <= 1) {
    let nextRateDown = getMostUsedPlayers(players.filter(e => e.hitRate === hitRates[1]))
    nextRateDown.sort((a, b) => {
      let x = a.displayName.toLowerCase()
      let y = b.displayName.toLowerCase()

      if (x > y) return 1
      if (x < y) return -1
      return 0
    })

    lvps = lvps.concat(nextRateDown).reverse()
  }

  return lvps
}

const calcPlayers = players => {
  const mvps = getMostSuccessfulPlayers(players)
  const faves = getMostUsedPlayers(players)
  const lvps = getLeastSuccessfulPlayers(players)

  return [
    {
      header: 'MVPs',
      description: '100% Hit Rate',
      players: mvps,
    },
    {
      header: 'Favorite Players',
      description: 'Most Appearances',
      players: faves,
    },
    {
      header: 'LVPs',
      description: 'Lowest Hit Rates',
      players: lvps,
    },
  ]
}

export { getMostUsedPlayers, getMostSuccessfulPlayers, getLeastSuccessfulPlayers, calcPlayers }

// TODO: CREATE NEW METHODS TO SORT PLAYERS
// TODO: EACH HIT RATE?
// TODO: CREATE A COMPONENT SO PERSON CAN CLICK PLAYER
// TODO: AND GET DETAILS ON THEIR HISTORY

// TODO: REFACTOR LOGIC WITH NEW PLAYER OBJECTS
