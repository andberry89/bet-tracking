import { eachDayOfInterval, isWithinInterval } from 'date-fns'
import dateFormat from 'dateformat'

const createDataset = (range, allBets) => {
  const startDate = range[0]
  const endDate = range[1]

  // Get all dates within the range
  const dates = eachDayOfInterval({
    start: startDate,
    end: endDate,
  }).map(date => dateFormat(date, 'UTC:m/dd'))

  // Get all bets within the range
  const bets = allBets.filter(bet =>
    isWithinInterval(dateFormat(bet.date, 'UTC:yyyy/mm/dd'), {
      start: startDate,
      end: endDate,
    }),
  )
  // Get all settled bets from the bets within the range
  const settledBets = bets.filter(bet => bet.settled)

  let dailyTotals = Array(dates.length).fill(0)

  // Run through the settled bets for each date in the range
  // Adding or subtracting from the daily total
  for (let i = 0; i < dates.length; i++) {
    for (let j = 0; j < settledBets.length; j++) {
      const bet = settledBets[j]
      const date = dateFormat(bet.date, 'UTC:m/dd')
      if (date === dates[i]) {
        bet.won ? (dailyTotals[i] += bet.payout) : (dailyTotals[i] -= bet.risk)
      }
    }
  }

  let runningTotal = []
  runningTotal[0] = dailyTotals[0]

  for (let i = 1; i < dailyTotals.length; i++) {
    runningTotal[i] = Math.round((runningTotal[i - 1] + dailyTotals[i]) * 100) / 100
  }

  return { dates, runningTotal }
}

export default createDataset
