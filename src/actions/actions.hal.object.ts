import { getHalObjectResponse } from "..";
import { IHalEmbededObject } from "../types/types.object";

/**
 *
 * @param embededObject
 * @returns
 */
export const prepareEmbededData = (
  embededObject: IHalEmbededObject | undefined
) => {
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
