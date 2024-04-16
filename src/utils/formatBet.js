import { filterSports } from './handleLegs'

const formatBet = details => {
  console.log(details)
  for (let i = 0; i < details.legs.length; i++) {
    const over = details.legs[i].over
    const line = details.legs[i].line
    if (over === 'Other ') {
      details.legs[i].over === ''
    }
    details.legs[i].line = parseInt(line)
  }

  details = {
    ...details,
    settled: details.settled.toLowerCase() === 'yes',
    won: details.won.toLowerCase() === 'yes',
    future: details.future.toLowerCase() === 'yes',
    promo: details.promo.toLowerCase() === 'yes',
    bonus: details.bonus.toLowerCase() === 'yes',
    sports: filterSports(details.legs),
  }

  return details
}

export default formatBet
