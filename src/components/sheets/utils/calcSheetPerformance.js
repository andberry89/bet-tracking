import propNames from '@/utils/sheets/propNames'

const calcSheetPerformance = sheets => {
  // ORGANIZE SHEETS INTO SEPARATE CATEGORIES

  // get the values from the name key
  const keys = sheets[0].props.map(value => value.name)

  // get the display name from each key
  const keyNames = Object.assign({}, ...propNames(sheets[0].sheet))

  let sortedSheets = {}

  // sort each sheet by prop type into its own array
  // values have to be sorted into an array for each sheet
  // to calculate perfect categories
  // later we concat all values into a single array
  keys.forEach(key => {
    let propArr = []

    sheets.forEach(sheet => {
      sheet.props.forEach(prop => {
        if (prop.name === key) {
          let arr = []
          prop.values.forEach(value => {
            const val = {
              ...value,
              date: sheet.date,
              sheetName: sheet.name,
            }
            arr.push(val)
          })
          propArr.push(arr)
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
      const localTotal = e.length
      total += e.length
      let lineHit = 0
      e.forEach(line => {
        if (line.hit) {
          lineHit++
        }
      })
      if (lineHit === localTotal) {
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

    // concat all values for each prop
    // into a single array
    propArr = [].concat(...propArr)
    sortedSheets[key].values = propArr
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

  // create an array of all players used
  // adding individual lines
  // while also calculating
  let players = []

  sheets.forEach(sheet => {
    sheet.props.forEach(prop => {
      prop.values.forEach(value => {
        const idx = players.findIndex(player => player.name === value.player)
        if (idx === -1) {
          let hits = value.hit ? 1 : 0
          let appearances = 1
          let hitRate = parseFloat(hits / appearances)
          players.push({
            name: value.player,
            appearances: appearances,
            hits: hits,
            hitRate: hitRate,
            lines: [
              {
                date: sheet.date,
                sheetName: sheet.name,
                prop: prop.name,
                overUnder: value.overUnder,
                line: value.line,
                result: value.result,
                hit: value.hit,
              },
            ],
          })
        } else {
          players[idx].appearances++
          if (value.hit) {
            players[idx].hits++
          }
          players[idx].hitRate = parseFloat(players[idx].hits / players[idx].appearances)
          players[idx].lines.push({
            date: sheet.date,
            sheetName: sheet.name,
            prop: prop.name,
            overUnder: value.overUnder,
            line: value.line,
            result: value.result,
            hit: value.hit,
          })
        }
      })
    })
  })

  return { sortedSheets, perfectSheets, players }
}

export default calcSheetPerformance
