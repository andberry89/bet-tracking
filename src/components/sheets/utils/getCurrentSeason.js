import { compareAsc } from 'date-fns'

const getCurrentSeason = sheetId => {
  let startDate = new Date()
  const today = new Date()
  let year = today.getFullYear()

  switch (sheetId) {
    case '660db1bcf994906905e1ce76': // nfl
      startDate = new Date(year, 7, 1)
      break
    case '660db1bcf994906905e1ce75': // mlb
      startDate = new Date(year, 2, 1)
      break
    case '66f1c78b3ed92cc9220749e7': // nhl
      startDate = new Date(year, 9, 1)
      break
    case '660db1bcf994906905e1ce77': // nba
      startDate = new Date(year, 8, 1)
      break
    case '660db1bcf994906905e1ce78': // nba all-in-one
      startDate = new Date(year, 8, 1)
      break
    case '660db1bcf994906905e1ce79': // nba starting 5
      startDate = new Date(year, 8, 1)
      break
  }

  const isTodayAfterStartDate = compareAsc(today, startDate)
  year = isTodayAfterStartDate === 1 ? year : year - 1

  return year
}

export default getCurrentSeason
