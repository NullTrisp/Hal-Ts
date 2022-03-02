import util from "util";
import { generateHalCollectionResponse } from "./actions/actions.hal.collection";
import { chunkArray, prepareEmbededData } from "./actions/actions.hal.object";
import { PageNotFoundError } from "./types/types";
import { IHalCollectionRequest } from "./types/types.collection";
import {
  IHalObjectRequest,
  IHalObjectResponse,
  IHalObject,
} from "./types/types.object";

util.inspect.defaultOptions.depth = null;

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
  const chunks = chunkArray<IHalObject>(baseData.data, baseData.chunk);

  if (chunks.length < baseData.page) {
    throw new PageNotFoundError();
  }

  const response = generateHalCollectionResponse({
    links: {
      selfUrl: `${baseData.url}/${baseData.page === 1 ? "" : baseData.page}`,
      firstUrl: baseData.url,
      lastUrl: `${baseData.url}/${chunks.length}`,
      nextUrl: `${baseData.url}/${baseData.page + 1}`,
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
