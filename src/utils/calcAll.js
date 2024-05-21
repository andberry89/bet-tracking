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
    roi = (((won - lost) / risk) * 100).toFixed(2)

    return { won, lost, risk, roi }
  }

  let dateToday = new Date()
  let dateYesterday = new Date()
  let dateLastWeek = new Date()
  dateToday = dateFormat(new Date(), 'isoDate')
  dateYesterday = dateFormat(dateYesterday.setDate(dateYesterday.getDate() - 1), 'isoDate')
  dateLastWeek = dateFormat(dateLastWeek.setDate(dateLastWeek.getDate() - 7), 'isoDate')

  const todaysBets = bets.filter(bet => dateFormat(bet.date, 'isoDate', true) === dateToday)
  const yesterdaysBets = bets.filter(bet => dateFormat(bet.date, 'isoDate', true) === dateYesterday)
  const lastWeeksBets = bets.filter(bet => Date.parse(dateLastWeek) <= Date.parse(bet.date))

  const today = calcPerformance(todaysBets)
  const yesterday = calcPerformance(yesterdaysBets)
  const lastWeek = calcPerformance(lastWeeksBets)

  return { today, yesterday, lastWeek }
}

export default calcAll
