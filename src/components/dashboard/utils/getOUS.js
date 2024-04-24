const getOUS = (val, line) => {
  val = val.toLowerCase()
  switch (val) {
    case 'over':
      return 'o'
    case 'under':
      return 'u'
    case 'spread':
      if (line > 0) {
        return '+'
      } else {
        return ''
      }
    default:
      return ''
  }
}

export default getOUS
