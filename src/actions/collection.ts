import {
  InvalidChunkSize,
  InvalidPage,
  PageNotFoundError,
} from "../types/error";
import {
  IHalCollectionRawRequest,
  IHalCollectionLinks,
  IHalCollectionResponse,
  IHalCollectionResponseLinks,
  IHalCollectionRequest,
} from "../types/collection";
import { IHalObject } from "../types/object";

export const prepareCollectionLinks = (
  url: string,
  page: number,
  chunksQuantity: number,
  queryParams: string | object | undefined
) => {
  if (queryParams === undefined) {
    queryParams = "";
  } else if (typeof queryParams === "object") {
    const query = queryParams;
    queryParams = "";
    Object.entries(query).forEach(([key, value]) => {
      if (key !== "page") {
        queryParams += `&${key}=${value}`;
      }
    });
  } else {
    queryParams = `&${queryParams}`;
  }

  const selfUrl = `${url}/?page=${page}${queryParams}`;

  const links: IHalCollectionLinks = {
    selfUrl: selfUrl,
    firstUrl:
      page === 1
        ? selfUrl
        : `${url}/${queryParams ? "?" + queryParams.substring(1) : ""}`,
    lastUrl: `${url}/?page=${chunksQuantity}${queryParams}`,
    nextUrl:
      chunksQuantity > 1
        ? `${url}/?page=${page + 1}${queryParams}`
        : `${url}/?page=${page}${queryParams}`,
    prevUrl:
      page === 1
        ? selfUrl
        : `${url}/${
            page === 1
              ? queryParams && "?" + queryParams.substring(1)
              : "?page=" + (page - 1) + queryParams
          }`,
  };

  return links;
};
/**
 *
 * @param links
 * @returns
 */
export const obtainCollectionLinks = (links: IHalCollectionLinks) => {
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
    _links: obtainCollectionLinks(baseData.links),
    count: baseData.data.length,
    total: baseData.total,
    _embeded: {
      [baseData.collectionName]: baseData.data,
    },
    page: baseData.page,
  };

  return response;
};

/**
 * Validates the requested data
 * @param baseData
 */
export const validateCollectionData = (baseData: IHalCollectionRequest) => {
  if (baseData.page < 1) {
    throw new InvalidPage();
  }
  if (baseData.chunk < 1) {
    throw new InvalidChunkSize();
  }
};

/**
 * Split an array into chunks
 * @param array array of data
 * @param chunkSize chunk size for each split
 * @returns splited array
 */
export const chunkArray = <T>(array: T[], chunkSize: number) => {
  const tempArray = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    tempArray.push(array.slice(i, i + chunkSize));
  }

  return tempArray;
};

/**
 * Takes an array chunks it and validates the requested page
 * @param array {@link IHalObject[]}
 * @param chunkSize chunk size to split array
 * @param page requested response page
 * @returns splited array
 */
export const getChunks = (
  array: IHalObject[],
  chunkSize: number,
  page: number
) => {
  const chunks = chunkArray<IHalObject>(array, chunkSize);
  if (chunks.length < page) {
    throw new PageNotFoundError();
  } else {
    return chunks;
  }
};
