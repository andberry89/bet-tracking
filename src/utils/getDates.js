import dateFormat from 'dateformat'

const getDates = () => {
  let yesterday = new Date()
  let lastWeek = new Date()
  let lastMonth = new Date()
  let firstOfTheMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  let firstOfTheYear = new Date(new Date().getFullYear(), 0, 1)

  const today = dateFormat(new Date(), 'isoDate')
  yesterday = dateFormat(yesterday.setDate(yesterday.getDate() - 1), 'isoDate')
  lastWeek = dateFormat(lastWeek.setDate(lastWeek.getDate() - 7), 'isoDate')
  lastMonth = dateFormat(lastMonth.setDate(lastMonth.getDate() - 30), 'isoDate')
  firstOfTheMonth = dateFormat(firstOfTheMonth, 'isoDate')
  firstOfTheYear = dateFormat(firstOfTheYear, 'isoDate')

  const dates = {
    today: today,
    yesterday: yesterday,
    lastWeek: lastWeek,
    lastMonth: lastMonth,
    firstOfTheMonth: firstOfTheMonth,
    firstOfTheYear: firstOfTheYear,
  }

  return dates
}

export default getDates
