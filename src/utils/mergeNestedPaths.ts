import { PrivatePath, PublicPath } from '../types';
import getParsedPaths from './getParsedPaths';
import reOrderPaths from './reOrderPaths';

const mergeNestedPaths = (paths: PublicPath[] | PrivatePath[]) =>
  reOrderPaths(getParsedPaths('nestedPaths')(paths));
export default mergeNestedPaths;
