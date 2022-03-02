import {
  InvalidChunkSize,
  InvalidPage,
  PageNotFoundError,
} from "../types/types";
import {
  IHalCollectionRawRequest,
  IHalCollectionLinks,
  IHalCollectionResponse,
  IHalCollectionResponseLinks,
  IHalCollectionRequest,
} from "../types/types.collection";
import { IHalObject } from "../types/types.object";
import { chunkArray } from "./actions.hal.object";

/**
 *
 * @param links
 * @returns
 */
export const prepareCollectionLinks = (links: IHalCollectionLinks) => {
  const response: IHalCollectionResponseLinks = {
    self: {
      href: links.selfUrl,
    },
    first: {
      href: links.firstUrl,
    },
    prev: {
      href: links.prevUrl,
    },
    next: {
      href: links.nextUrl,
    },
    last: {
      href: links.lastUrl,
    },
  };

  return response;
};

/**
 *
 * @param baseData
 * @returns
 */
export const generateHalCollectionResponse = (
  baseData: IHalCollectionRawRequest
) => {
  const response: IHalCollectionResponse = {
    _links: prepareCollectionLinks(baseData.links),
    count: baseData.data.length,
    total: baseData.total,
    _embeded: {
      [baseData.collectionName]: baseData.data,
    },
    page: baseData.page,
  };

  return response;
};

export const validateCollectionData = (baseData: IHalCollectionRequest) => {
  if (baseData.page < 1) {
    throw new InvalidPage();
  }
  if (baseData.chunk < 1) {
    throw new InvalidChunkSize();
  }
};

export const getChunks = (array: IHalObject[], chunk: number, page: number) => {
  const chunks = chunkArray<IHalObject>(array, chunk);
  if (chunks.length < page) {
    throw new PageNotFoundError();
  } else {
    return chunks;
  }
};
