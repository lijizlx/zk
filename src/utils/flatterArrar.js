// 扁平化路由数组
const flattenArray = arr => {
  let result = [];
  arr.forEach(item => {
    result.push(item); // 将当前节点添加到结果数组中
    if (Array.isArray(item.children)) {
      result = result.concat(flattenArray(item.children)); // 递归处理子节点
      delete item.children; // 处理完子节点后删除 children 属性
    }
  });
  return result;
}

export default flattenArray