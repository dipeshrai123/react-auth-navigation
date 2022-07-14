import { PrivatePath, PublicPath } from '../types';

const reOrderPaths = (pathArray: PublicPath[] | PrivatePath[]) => {
  const clonePathArray = [...pathArray];

  return clonePathArray.sort(function (a, b) {
    if (a.path.length > b.path.length) {
      return -1;
    } else if (a.path.length < b.path.length) {
      return 1;
    } else {
      return 0;
    }
  });
};

export default reOrderPaths;
