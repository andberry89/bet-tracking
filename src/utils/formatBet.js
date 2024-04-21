import { filterSports } from './handleLegs'

const formatBet = details => {
  let newDetails = details
  let len = newDetails.legs.length

  for (let i = 0; i < len; i++) {
    let over = newDetails.legs[i].over
    let line = newDetails.legs[i].line
    if (over === 'Other') {
      newDetails.legs[i].over = ''
    } else if (over === 'Moneyline') {
      newDetails.legs[i].over = ''
      newDetails.legs[i].prop = 'Moneyline'
    }
    newDetails.legs[i].line = parseFloat(line)
  }

  const formattedDetails = {
    contributor: newDetails.contributorId,
    imageUrl: newDetails.imageUrl,
    date: newDetails.date,
    risk: parseFloat(newDetails.risk),
    odds: parseInt(newDetails.odds, 10),
    payout: parseFloat(newDetails.payout),
    settled: newDetails.settled.toLowerCase() === 'yes',
    won: newDetails.won.toLowerCase() === 'yes',
    sports: filterSports(newDetails.legs),
    future: newDetails.future.toLowerCase() === 'yes',
    book: newDetails.book,
    promo: newDetails.promo.toLowerCase() === 'yes',
    bonus: newDetails.bonus.toLowerCase() === 'yes',
    type: newDetails.type,
    legs: newDetails.legs,
  }

  return formattedDetails
}

export default formatBet
