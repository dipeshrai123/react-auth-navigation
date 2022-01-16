// Re-order flatten arrays on the basis of path length descending wise to
// solve problem of not exact nestedpaths
export const reOrderPaths = (pathArray: any) => {
  const clonePathArray = [...pathArray];

  return clonePathArray.sort(function (a, b) {
    if (a.path?.length > b.path?.length) {
      return -1;
    } else if (a.path?.length < b.path?.length) {
      return 1;
    } else {
      return 0;
    }
  });
};
