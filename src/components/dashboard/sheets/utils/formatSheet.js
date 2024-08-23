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
    prop.values = prop.values.map(e => ({ ...e, result: null, hit: false }))
  })

  const newDetails = {
    sheet: details.sheet,
    date: details.date,
    open: true,
    props: sheetProps,
  }

  console.log(newDetails)

  return newDetails
}

export default formatSheet
