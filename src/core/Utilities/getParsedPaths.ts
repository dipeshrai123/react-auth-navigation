// Flattens the nested and sub paths
export const getParsedPaths =
  (pathType: "subPaths" | "nestedPaths") => (paths: any) => {
    const getNestedArray = (pathObj: any): any => {
      if (pathObj[pathType]) {
        const routes = pathObj[pathType].map((route: any) => {
          const path = `${pathObj.path}${route.path}`.replace("//", "/");
          const modRoute = { ...route, path };
          return getNestedArray(modRoute);
        });
        return [pathObj, ...routes].flat();
      } else return pathObj;
    };

    const allPaths = paths.map((path: any) => {
      return getNestedArray(path);
    });

    return allPaths.flat();
  };
