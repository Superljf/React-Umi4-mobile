import { useLocation } from 'umi';
import routes from '../routes';

// 扁平化路由配置，提取所有路由
const flattenRoutes = (routeList: any[]): any[] => {
  let result: any[] = [];

  routeList.forEach(route => {
    if (route.routes) {
      // 如果有子路由，递归处理
      result = result.concat(flattenRoutes(route.routes));
    }

    // 只添加有 path 和 name 的路由
    if (route.path && route.name) {
      result.push({
        path: route.path,
        name: route.name
      });
    }
  });

  return result;
};

// 所有扁平化的路由
const flatRoutes = flattenRoutes(routes);

/**
 * 自定义钩子，根据当前路径获取路由标题
 * @param defaultTitle 默认标题，当找不到匹配路由时返回
 * @returns 当前路由的标题
 */
export default function useRouteTitle(defaultTitle: string = '默认标题'): string {
  const location = useLocation();
  const { pathname } = location;

  // 查找匹配的路由
  const matchedRoute = flatRoutes.find(route => {
    // 精确匹配路径
    if (route.path === pathname) {
      return true;
    }

    // 处理动态路由，如 /user/:id
    if (route.path.includes(':')) {
      const routePathSegments = route.path.split('/').filter(Boolean);
      const pathSegments = pathname.split('/').filter(Boolean);

      if (routePathSegments.length !== pathSegments.length) {
        return false;
      }

      return routePathSegments.every((segment, index) => {
        return segment.startsWith(':') || segment === pathSegments[index];
      });
    }

    return false;
  });

  return matchedRoute?.name || defaultTitle;
}
