import {
  isWithinInterval,
  previousSunday,
  previousSaturday,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfYear,
  subDays,
} from 'date-fns'
import dateFormat from 'dateformat'

const getSplitSheets = sheets => {
  const today = new Date()
  const lastWeekSat = previousSaturday(today)
  const lastWeekSun = subDays(lastWeekSat, 6)
  const prevSun = previousSunday(today)
  const startLastMonth = subMonths(startOfMonth(today), 1)
  const endLastMonth = endOfMonth(startLastMonth)
  const startThisMonth = startOfMonth(today)
  const startThisYear = startOfYear(today)

  const filterSheets = (startDate, endDate) => {
    return sheets.filter(sheet => {
      return isWithinInterval(dateFormat(sheet.date, 'UTC:yyyy/mm/dd'), {
        start: startDate,
        end: endDate,
      })
    })
  }

  const lastWeekSheets = filterSheets(lastWeekSun, lastWeekSat)
  const thisWeekSheets = filterSheets(prevSun, today)
  const lastMonthSheets = filterSheets(startLastMonth, endLastMonth)
  const thisMonthSheets = filterSheets(startThisMonth, today)
  const thisYearSheets = filterSheets(startThisYear, today)
  const thisSeasonSheets = sheets

  return [
    {
      label: 'Last Week',
      sheets: lastWeekSheets,
      slug: 'lastWeek',
    },
    {
      label: 'This Week',
      sheets: thisWeekSheets,
      slug: 'thisWeek',
    },
    {
      label: 'Last Month',
      sheets: lastMonthSheets,
      slug: 'lastMonth',
    },
    {
      label: 'This Month',
      sheets: thisMonthSheets,
      slug: 'thisMonth',
    },
    {
      label: 'This Year',
      sheets: thisYearSheets,
      slug: 'thisYear',
    },
    {
      label: 'This Season',
      sheets: thisSeasonSheets,
      slug: 'thisSeason',
    },
  ]
}

export default getSplitSheets
