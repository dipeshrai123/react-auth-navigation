import { useNavigation } from "./useNavigation";

/**
 * Get query params for current url location
 * @param { string } queryStr Query params string can be pass which overrides the current location query
 * @returns Object with key value pair
 */
export function useQuery(queryStr: string | null = null) {
  const { location } = useNavigation();
  const queryParams = new URLSearchParams(queryStr ?? location.search);

  const resultObject = {};
  for (let [key, value] of queryParams.entries()) {
    resultObject[key] = value;
  }

  return resultObject;
}
