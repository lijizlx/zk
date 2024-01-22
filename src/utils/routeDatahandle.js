// 通过Local中的激活路由 找到它所在的最高级一级菜单 使头部在刷新后高亮这个一级菜单
export const findTopMostParent = (routes, targetPath) => {
  for (let route of routes) {
    if (route.path === targetPath) {
      return route; // 如果当前路由就是目标路由，则返回该路由对象
    }
    if (route.children && route.children.length > 0) {
      const foundChild = findTopMostParent(route.children, targetPath);
      if (foundChild) {
        return route; // 如果在子路由中找到目标路由，则返回当前路由作为最高级父辈
      }
    }
  }
  return null; // 如果找不到目标路由，则返回null
}
// 通过path找到它这整条路由对象
export const findRouteByPath = (routes, targetPath) => {
  for (let route of routes) {
    if (route.path === targetPath) {
      return route; // 如果当前路由就是目标路由，则返回该路由对象
    }
    if (route.children && route.children.length > 0) {
      const foundChild = findRouteByPath(route.children, targetPath);
      if (foundChild) {
        return foundChild; // 如果在子路由中找到目标路由，则返回找到的子路由对象
      }
    }
  }
  return null; // 如果找不到目标路由，则返回null
}

// 通过path找到它所有的父节点
export const findAllParentRoutes = (routes, path, parents = []) => {
  for (let route of routes) {
    if (route.children) {
      const foundChild = route.children.find(child => child.path === path);
      if (foundChild) {
        return [...parents, route];
      } else {
        const foundParent = findAllParentRoutes(route.children, path, [...parents, route]);
        if (foundParent) {
          return foundParent;
        }
      }
    }
  }
  return null;
}

// 判断一个路由对象是不是最高级
export const findParent = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].children && arr[i].children.includes(target)) {
      return arr[i];
    } else if (arr[i].children) {
      const parent = findParent(arr[i].children, target);
      if (parent) {
        return parent;
      }
    }
  }
  return null;
}