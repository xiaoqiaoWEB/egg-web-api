exports.getUserStatus = (v) => {
  let name = ''
  switch (v) {
    case 1:
      name = '启用'
      break
    case 0:
      name = '禁用'
      break
    default:
      break
  }
  return name
}
