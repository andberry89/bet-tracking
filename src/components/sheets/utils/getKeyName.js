const getKeyName = (name, sheetProps) => {
  const idx = Object.keys(sheetProps).filter(key => {
    return name === Object.keys(sheetProps[key])[0]
  })
  return sheetProps[idx][name]
}

export default getKeyName
