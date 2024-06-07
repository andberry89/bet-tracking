import dateFormat from 'dateformat'
import getDates from '@/utils/getDates'

const calcAll = bets => {
  const calcPerformance = bets => {
    let wonArr = []
    let lostArr = []
    let riskArr = []
    let won, lost, risk, roi

    bets.forEach(bet => {
      if (bet.won) wonArr.push(bet.payout)
      if (!bet.won) lostArr.push(bet.risk)
      riskArr.push(bet.risk)
    })

    won = wonArr.reduce((a, b) => a + b, 0).toFixed(2)
    lost = lostArr.reduce((a, b) => a + b, 0).toFixed(2)
    risk = riskArr.reduce((a, b) => a + b, 0).toFixed(2)
    const net = (won - lost).toFixed(2)
    roi = risk != 0 ? ((net / risk) * 100).toFixed(2) : 0

    return { won, lost, net, risk, roi }
  }

  const dates = getDates()

  const todaysBets = bets.filter(bet => dateFormat(bet.date, 'isoDate', true) === dates.today)
  const yesterdaysBets = bets.filter(bet => dateFormat(bet.date, 'isoDate', true) === dates.yesterday)
  const lastWeeksBets = bets.filter(bet => Date.parse(dates.lastWeek) <= Date.parse(bet.date))
  const lastMonthsBets = bets.filter(bet => Date.parse(dates.lastMonth) <= Date.parse(bet.date))
  const monthToDateBets = bets.filter(bet => Date.parse(dates.firstOfTheMonth) <= Date.parse(bet.date))
  const yearToDateBets = bets.filter(bet => Date.parse(dates.firstOfTheYear) <= Date.parse(bet.date))

  const today = calcPerformance(todaysBets)
  const yesterday = calcPerformance(yesterdaysBets)
  const l7 = calcPerformance(lastWeeksBets)
  const l30 = calcPerformance(lastMonthsBets)
  const mtd = calcPerformance(monthToDateBets)
  const ytd = calcPerformance(yearToDateBets)

  return { today, yesterday, l7, l30, mtd, ytd }
}

export default calcAll
