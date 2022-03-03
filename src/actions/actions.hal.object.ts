import { getHalObjectResponse } from "..";
import { IHalEmbededObject, IHalObjectResponse } from "../types/types.object";

/**
 * Takes an embeded object and transpiles it to a response object
 * @param embededObject
 * @returns a new response object to embed
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
 * Typeguard for Hal embeded array
 *
 * @param obj any object to be tested
 * @returns either if is response Hal embeded array
 */
export const isHalEmbededObjectArray = (
  obj: IHalEmbededObject[] | IHalEmbededObject | undefined
): obj is IHalEmbededObject[] =>
  (obj as IHalEmbededObject[]).length !== undefined;

/**
 * Typeguard for Hal embeded object
 *
 * @param obj any object to be tested
 * @returns either if is response Hal embeded object
 */
export const isHalEmbededObject = (
  obj: IHalEmbededObject[] | IHalEmbededObject | undefined
): obj is IHalEmbededObject => (obj as IHalEmbededObject).length === undefined;

/**
 * Typeguard for HalResponse object
 *
 * @param obj any object to be tested
 * @returns either if is response HalResponse object
 */
export const isHalObjectResponse = (
  obj: IHalObjectResponse | IHalObjectResponse[] | undefined
): obj is IHalObjectResponse =>
  (obj as IHalObjectResponse).length === undefined;

/**
 * Typeguard for HalResponseArray
 *
 * @param obj any object to be tested
 * @returns either if is response HalResponseArray
 */
export const isHalObjectResponseArray = (
  obj: IHalObjectResponse | IHalObjectResponse[] | undefined
): obj is IHalObjectResponse[] =>
  (obj as IHalObjectResponse).length !== undefined;
