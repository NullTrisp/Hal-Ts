import {
    IHalCollectionRawRequest,
  IHalCollectionLinks,
  IHalCollectionResponse,
  IHalCollectionResponseLinks,
} from "../types/types.collection";

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
