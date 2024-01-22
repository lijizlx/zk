const setColor = (hex, alpha) => {
  // 去除 # 号
  hex = hex.replace('#', '');

  // 将三位颜色转换为六位
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // 提取每个颜色通道的值
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
}

export default setColor