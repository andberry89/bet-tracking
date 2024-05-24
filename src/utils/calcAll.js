import dateFormat from 'dateformat'

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

  let dateToday = new Date()
  let dateYesterday = new Date()
  let dateLastWeek = new Date()
  let dateFirstOfTheMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  let dateFirstOfTheYear = new Date(new Date().getFullYear(), 0, 1)

  dateToday = dateFormat(new Date(), 'isoDate')
  dateYesterday = dateFormat(dateYesterday.setDate(dateYesterday.getDate() - 1), 'isoDate')
  dateLastWeek = dateFormat(dateLastWeek.setDate(dateLastWeek.getDate() - 7), 'isoDate')
  dateFirstOfTheMonth = dateFormat(dateFirstOfTheMonth, 'isoDate')
  dateFirstOfTheYear = dateFormat(dateFirstOfTheYear, 'isoDate')

  const todaysBets = bets.filter(bet => dateFormat(bet.date, 'isoDate', true) === dateToday)
  const yesterdaysBets = bets.filter(bet => dateFormat(bet.date, 'isoDate', true) === dateYesterday)
  const lastWeeksBets = bets.filter(bet => Date.parse(dateLastWeek) <= Date.parse(bet.date))
  const monthToDateBets = bets.filter(bet => Date.parse(dateFirstOfTheMonth) <= Date.parse(bet.date))
  const yearToDateBets = bets.filter(bet => Date.parse(dateFirstOfTheYear) <= Date.parse(bet.date))

  const today = calcPerformance(todaysBets)
  const yesterday = calcPerformance(yesterdaysBets)
  const l7 = calcPerformance(lastWeeksBets)
  const mtd = calcPerformance(monthToDateBets)
  const ytd = calcPerformance(yearToDateBets)

  return { today, yesterday, l7, mtd, ytd }
}

export default calcAll
