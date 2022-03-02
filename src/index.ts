import {
  generateHalCollectionResponse,
  getChunks,
  validateCollectionData,
} from "./actions/actions.hal.collection";
import { prepareEmbededData } from "./actions/actions.hal.object";
import { IHalCollectionRequest } from "./types/types.collection";
import { IHalObjectRequest, IHalObjectResponse } from "./types/types.object";

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
export const getHalObjectResponse = (baseData: IHalObjectRequest) => {
  const response: IHalObjectResponse = {
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

/**
 *
 * @param baseData
 * @returns
 */
export const getCollectionResponse = (baseData: IHalCollectionRequest) => {
  validateCollectionData(baseData);
  const chunks = getChunks(baseData.data, baseData.chunk, baseData.page);

  const response = generateHalCollectionResponse({
    links: {
      selfUrl: `${baseData.url}${
        baseData.page === 1 ? "/" : `/${baseData.page}`
      }`,
      firstUrl: `${baseData.url}/`,
      lastUrl:
        chunks.length > 1
          ? `${baseData.url}/${chunks.length}`
          : `${baseData.url}/`,
      nextUrl:
        chunks.length > 1
          ? `${baseData.url}/${baseData.page + 1}`
          : `${baseData.url}/`,
      prevUrl: `${baseData.url}/${
        baseData.page === 1 ? "" : baseData.page - 1
      }`,
    },
    data: chunks[baseData.page - 1],
    total: baseData.data.length,
    collectionName: baseData.collectionName,
    page: baseData.page,
  });

  return response;
};
