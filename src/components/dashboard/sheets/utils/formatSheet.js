import getCurrentSeason from '@/components/sheets/utils/getCurrentSeason'

const formatSportsSheet = (props, details, newDetails) => {
  const propKeys = props.flatMap(Object.keys)
  const sheetProps = []

  propKeys.forEach(prop => {
    if (details[prop]) {
      sheetProps.push({
        name: prop,
        values: details[prop],
      })
    }
  })

  sheetProps.forEach(prop => {
    if (prop.values) {
      prop.values = prop.values.filter(e => {
        return !(e.line === e.odds)
      })
      prop.values = prop.values.map(e => ({ ...e, result: null, hit: false }))
    }
  })

  newDetails = {
    ...newDetails,
    name: details.name,
    props: sheetProps,
  }

  console.log(newDetails)
  return newDetails
}

const formatSheet = (props, details) => {
  const isStarting5 = details.sheet === '660db1bcf994906905e1ce79'

  let newDetails = {
    _id: details._id,
    sheet: details.sheet,
    date: details.date,
    open: true,
    season: getCurrentSeason(details.sheet),
  }

  if (!isStarting5) {
    newDetails = formatSportsSheet(props, details, newDetails)
  } else {
    newDetails = {
      ...newDetails,
      hit: null,
      odds: details.odds,
      players: details.players,
    }
  }

  return newDetails
}

export default formatSheet

//TODO: ADD VOID OPTION FOR SHEETS
