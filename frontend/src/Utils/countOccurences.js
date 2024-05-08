export const countOccurrences = (inputObject) => {
  const occurrences = {}
  inputObject.forEach(item => {
      if (occurrences[item]) {
          occurrences[item] += 1
      } else {
          occurrences[item] = 1
      }
  })
  return occurrences
}

export const extractValues = (inputObject, keyName) => {
  return inputObject.map(entry => entry[keyName])
}

export const getKeysAndValues = (inputObject) => {
  const keys = Object.keys(inputObject)
  const values = Object.values(inputObject)
  return { keys, values }
}




