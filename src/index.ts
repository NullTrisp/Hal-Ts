import {
  HalEmbededObject,
  IHalBaseData,
  IHalResponseObject,
} from "./types/types";

/**
 *
 * @param data
 * @returns
 */
const prepareEmbededData = (embededObject: HalEmbededObject | undefined) => {
  if (embededObject) {
    return generateHalResponse({
      url: `${embededObject.url}`,
      data: embededObject,
    });
  } else {
    return undefined;
  }
};

/**
 * ```
 * generateObjectResponse({
 *  url: "http://localhost:8080/api/user",
 *  data: { identifier: 1, name: "Zay", isValid: true }
 * })
 * ```
 * @param baseData
 * @returns
 */
export const generateHalResponse = (baseData: IHalBaseData) => {
  const response: IHalResponseObject = {
    _links: {
      self: {
        href: `${baseData.url}/${baseData.data.identifier}`,
      },
    },
    ...baseData.data,
    _embeded: prepareEmbededData(baseData.data._embeded),
  };
  return response;
};
