import propNames from '@/utils/sheets/propNames'

const calcSheetPerformance = sheets => {
  // ORGANIZE SHEETS INTO SEPARATE CATEGORIES

  // get the values from the name key
  const keys = sheets[0].props.map(value => value.name)

  // get the display name from each key
  const keyNames = Object.assign({}, ...propNames(sheets[0].sheet))

  let sortedSheets = {}

  // sort each sheet by prop type into its own array
  keys.forEach(key => {
    let propArr = []

    sheets.forEach(e => {
      e.props.forEach(prop => {
        if (prop.name === key) {
          propArr.push(prop.values)
        }
      })
    })

    // create master sorted object
    sortedSheets[key] = {
      name: keyNames[key],
      values: propArr,
    }

    // calculate hits and totals

    let hit = 0
    let total = 0
    let perfectProp = 0

    sortedSheets[key].values.forEach(e => {
      total += e.length
      let lineHit = 0
      e.forEach(line => {
        if (line.hit) {
          lineHit++
        }
      })
      if (lineHit === total) {
        perfectProp++
      }
      hit += lineHit
    })

    sortedSheets[key] = {
      ...sortedSheets[key],
      hit: hit,
      total: total,
      perfect: perfectProp,
    }
  })

  // calculate perfect sheets
  let perfectSheets = 0

  sheets.forEach(sheet => {
    let perfect = true

    for (let i = 0; i < sheet.props.length; i++) {
      for (let j = 0; j < sheet.props[i].values.length; j++) {
        if (!sheet.props[i].values[j].hit) {
          perfect = false
          break
        }
      }
      if (!perfect) break
    }

    if (perfect) perfectSheets++
  })

  // create an array of all players used, then remove duplicates

  console.log(perfectSheets)
  // need to return sortedSheets, perfectSheets

  return 'hello'

  // TODO:
  // CALCULATE SHEET PERFORMANCES
  // Create an aray based on player and amount of times they've been used
  // Create a hit-rate for each player?
}

export default calcSheetPerformance
