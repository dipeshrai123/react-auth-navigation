import { PrivatePath, PublicPath } from '../types';
import getParsedPaths from './getParsedPaths';
import reOrderPaths from './reOrderPaths';

const mergeSubPaths = (paths: PublicPath[] | PrivatePath[]) =>
  reOrderPaths(
    getParsedPaths('subPaths')(paths).map(({ path, ...rest }) => {
      let hasNestedPath = false;
      if (rest.nestedPaths && rest.nestedPaths.length > 0) {
        hasNestedPath = true;
      }
      const res: any = { ...rest, path: hasNestedPath ? path + '/*' : path };
      if (hasNestedPath) {
        res.isNestedParent = true;
      }
      return res;
    })
  );
export default mergeSubPaths;
