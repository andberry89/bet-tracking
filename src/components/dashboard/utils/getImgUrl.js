const getImgUrl = path => {
  return require('@/assets/icons/' + path.toLowerCase() + '.png')
}

export default getImgUrl
