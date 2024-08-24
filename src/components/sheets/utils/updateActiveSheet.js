const updateActiveSheet = (items, id) => {
  const idx = items.findIndex(e => e._id === id)
  return idx
}

export default updateActiveSheet
