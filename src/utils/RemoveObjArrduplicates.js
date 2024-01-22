const removeObjArrDuplicates = (arr, propertyName) => {
  let uniqueMap = new Map();
  let result = [];
  for (let item of arr) {
    if (!uniqueMap.has(item[propertyName])) {
      uniqueMap.set(item[propertyName], item);
    }
  }
  for (let value of uniqueMap.values()) {
    result.push(value);
  }
  return result;
}

export default removeObjArrDuplicates