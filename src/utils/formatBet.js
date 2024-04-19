import { filterSports } from './handleLegs'

const formatBet = details => {
  console.log(details)
  for (let i = 0; i < details.legs.length; i++) {
    const over = details.legs[i].over
    const line = details.legs[i].line
    if (over === 'Other ') {
      details.legs[i].over === ''
    }
    details.legs[i].line = parseFloat(line)
  }

  const formattedDetails = {
    contributor: details.contributorId,
    imageUrl: details.imageUrl,
    date: details.date,
    risk: parseFloat(details.risk),
    odds: parseInt(details.odds, 10),
    payout: parseFloat(details.payout),
    settled: details.settled.toLowerCase() === 'yes',
    won: details.won.toLowerCase() === 'yes',
    sports: filterSports(details.legs),
    future: details.future.toLowerCase() === 'yes',
    book: details.book,
    promo: details.promo.toLowerCase() === 'yes',
    bonus: details.bonus.toLowerCase() === 'yes',
    type: details.type,
    legs: details.legs,
  }

  return formattedDetails
}

export default formatBet
