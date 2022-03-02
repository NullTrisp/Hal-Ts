import { getHalObjectResponse } from "..";
import { IHalEmbededObject, IHalObjectResponse } from "../types/types.object";

/**
 *
 * @param embededObject
 * @returns
 */
export const prepareEmbededData = (
  embededObject: IHalEmbededObject | undefined
): IHalObjectResponse | undefined => {
  if (embededObject) {
    return getHalObjectResponse({
      url: `${embededObject.url}`,
      data: embededObject,
    });
  } else {
    return undefined;
  }
};

/**
 *
 * @param array
 * @param chunkSize
 * @returns
 */
export const chunkArray = <T>(array: T[], chunkSize: number) => {
  let index = 0;
  let arrayLength = array.length;
  let tempArray = [];

  for (index = 0; index < arrayLength; index += chunkSize) {
    tempArray.push(array.slice(index, index + chunkSize));
  }

  return tempArray;
};

/**
 *
 * @param obj
 * @returns
 */
export const isHalEmbededObjectArray = (
  obj: IHalEmbededObject[] | IHalEmbededObject | undefined
): obj is IHalEmbededObject[] =>
  (obj as IHalEmbededObject[]).length !== undefined;

/**
 *
 * @param obj
 * @returns
 */
export const isHalEmbededObject = (
  obj: IHalEmbededObject[] | IHalEmbededObject | undefined
): obj is IHalEmbededObject => (obj as IHalEmbededObject).length === undefined;

/**
 *
 * @param obj
 * @returns
 */
export const isHalObjectResponse = (
  obj: IHalObjectResponse | IHalObjectResponse[] | undefined
): obj is IHalObjectResponse =>
  (obj as IHalObjectResponse).length === undefined;

/**
 *
 * @param obj
 * @returns
 */
export const isHalObjectResponseArray = (
  obj: IHalObjectResponse | IHalObjectResponse[] | undefined
): obj is IHalObjectResponse[] =>
  (obj as IHalObjectResponse).length !== undefined;
