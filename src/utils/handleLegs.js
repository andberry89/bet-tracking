export const filterSports = legs => {
  let sports = []

  // Get the sport from each leg
  legs.forEach(leg => sports.push(leg.sport))

  // remove the duplicates of sports
  return sports.filter((value, index) => sports.indexOf(value) === index)
}

export const findSport = details => {
  const findSport = market => {
    let sport = ''

    switch (market) {
      case 'MLB':
        sport = 'Baseball'
        break
      case 'KBO':
        sport = 'Baseball'
        break
      case 'NBA':
        sport = 'Basketball'
        break
      case 'College Basketball':
        sport = 'Basketball'
        break
      case 'NFL':
        sport = 'Football'
        break
      case 'College Football':
        sport = 'Football'
        break
      case 'UFL':
        sport = 'Football'
        break
      case 'NHL':
        sport = 'Hockey'
        break
      case 'Golf':
        sport = 'Golf'
        break
      case 'Soccer':
        sport = 'Soccer'
        break
      case 'Tennis':
        sport = 'Tennis'
        break
      case 'UFC':
        sport = 'MMA'
        break
      case 'Other':
        sport = 'Other'
        break
    }

    return sport
  }

  details.sport = findSport(details.market)

  return details
}
