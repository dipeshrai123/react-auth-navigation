import { PrivatePath, PublicPath } from '../types';

export const getParsedPaths =
  (pathType: 'subPaths' | 'nestedPaths') =>
  (paths: PublicPath[] | PrivatePath[]) => {
    const getNestedArray = (
      pathObj: PrivatePath | PublicPath
    ): PrivatePath[] | PublicPath[] | PublicPath | PrivatePath => {
      const subRoutes = pathObj[pathType];
      if (subRoutes) {
        const routes = subRoutes.map((route: PublicPath | PrivatePath) => {
          const path = `${pathObj.path}${route.path}`.replace('//', '/');
          const modRoute = { ...route, path };
          return getNestedArray(modRoute);
        });
        return [pathObj, ...routes].flat();
      } else return pathObj;
    };

    const allPaths = paths.map((path) => {
      return getNestedArray(path);
    });

    return allPaths.flat();
  };

export const parseSubPaths = (paths: PublicPath[] | PrivatePath[]) =>
  getParsedPaths('subPaths')(paths).map(({ subPaths: _subPaths, ...rest }) => ({
    ...rest,
  }));
