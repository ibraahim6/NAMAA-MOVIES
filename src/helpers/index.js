export const getItemLocalStorage = (itemName) => {
  return JSON.parse(window.localStorage.getItem(itemName))
}
export const setItemLocalStorage = (itemName, itemValue) => {
  return window.localStorage.setItem(itemName, JSON.stringify(itemValue))
}
export const removeEmptyStrings = (obj) => {
  if (!obj) return {}
  let newObj = {}
  Object.keys(obj).forEach((prop) => {
    if (obj[prop] !== null && obj[prop] !== '') {
      newObj[prop] = obj[prop]
    }
  })
  return newObj
}
