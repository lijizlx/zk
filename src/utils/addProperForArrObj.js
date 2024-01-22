const addPropertyToObjects = (arr, propertyName, propertyValue) => {
  return arr.map((item) => {
    if (item.children && Array.isArray(item.children) && item.children.length > 0) {
      return {
        ...item,
        [propertyName]: propertyValue,
        children: addPropertyToObjects(item.children, propertyName, propertyValue)
      };
    }
    return item;
  });
}

export default addPropertyToObjects