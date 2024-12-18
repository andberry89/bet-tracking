const calcPlayerProps = lines => {
  let props = []
  let propsArr = []

  lines.forEach(line => {
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

  return propsArr
}

export default calcPlayerProps

//TODO: CAN I CLEAN THIS UP? DO I NEED THE props[]?
