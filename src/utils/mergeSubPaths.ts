import { PrivatePath, PublicPath } from '../types';
import getParsedPaths from './getParsedPaths';
import reOrderPaths from './reOrderPaths';

const mergeSubPaths = (paths: PublicPath[] | PrivatePath[]) =>
  reOrderPaths(
    getParsedPaths('subPaths')(paths).map(
      ({ subPaths: _subPaths, ...rest }) => ({
        ...rest,
      })
    )
  );

export default mergeSubPaths;
