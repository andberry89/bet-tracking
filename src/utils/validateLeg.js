export const validateMarket = val => {
  if (val === '' || val === '--Select a Market--') {
    return false
  } else {
    return true
  }
}

export const validateSubject = val => {
  if (val === '') {
    return false
  } else {
    return true
  }
}

export const validateLine = (line, isOU, over) => {
  if (isOU && over === 'Other') {
    return true
  } else if (isOU && over === 'Spread' && line > 0) {
    return true
  } else if (isOU && over !== 'Spread' && line <= 0) {
    return false
  } else if (isOU && line > 0) {
    return true
  } else {
    return false
  }
}
export const validateProp = val => {
  if (val === '') {
    return false
  } else {
    return true
  }
}
