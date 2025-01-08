const calcPlayerProps = lines => {
  let props = []
  let propsArr = []

  let nonVoidLines = lines.filter(e => e.void === false)

  nonVoidLines.forEach(line => {
    const hit = line.hit ? 1 : 0
    if (!props.includes(line.prop)) {
      props.push(line.prop)
      propsArr.push({
        name: line.prop,
        hit: hit,
        appearances: 1,
      })
    } else {
      const idx = propsArr.findIndex(e => e.name === line.prop)
      propsArr[idx].hit += hit
      propsArr[idx].appearances++
    }
  })

  const appearances = nonVoidLines.length
  const hits = nonVoidLines.filter(e => e.hit === true).length
  const hitRate = appearances > 0 ? ((hits / appearances) * 100).toFixed(2) + '%' : '0%'

  const overallStats = [
    {
      label: 'Hits',
      value: hits,
    },
    {
      label: 'Picks',
      value: appearances,
    },
    {
      label: 'Hit Rate',
      value: hitRate,
    },
  ]

  return { propsArr, overallStats }
}

export default calcPlayerProps

//TODO: CAN I CLEAN THIS UP? DO I NEED THE props[]?
