const getValues = (name, props) => {
  const propsIdx = props.findIndex(e => e.name === name)
  if (propsIdx > -1) {
    return props[propsIdx].values
  } else {
    return []
  }
}

export default getValues
