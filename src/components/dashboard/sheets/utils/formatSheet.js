import getCurrentSeason from '@/components/sheets/utils/getCurrentSeason'

const formatSheet = (props, details) => {
  const propKeys = props.flatMap(Object.keys)
  const sheetProps = []

  propKeys.forEach(prop => {
    sheetProps.push({
      name: prop,
      values: details[prop],
    })
  })

  sheetProps.forEach(prop => {
    prop.values = prop.values.filter(e => e.player !== '')
    prop.values = prop.values.map(e => ({ ...e, result: null, hit: false }))
  })

  const newDetails = {
    _id: details._id,
    sheet: details.sheet,
    open: true,
    season: getCurrentSeason(details.sheet),
    date: details.date,
    name: details.name,
    props: sheetProps,
  }

  return newDetails
}

export default formatSheet
