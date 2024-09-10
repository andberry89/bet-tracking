const getKey = (index, sheetProps) => {
  return Object.keys(sheetProps[index])[0]
}

const getKeyName = (index, sheetProps) => {
  return Object.values(sheetProps[index])[0]
}

const getValues = (index, sheet, sheetProps) => {
  const propsIdx = sheet.props.findIndex(e => e.name === getKey(index, sheetProps))
  return sheet.props[propsIdx].values
}

export { getKey, getKeyName, getValues }
