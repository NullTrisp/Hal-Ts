import util from "util";
import {
  IHalBaseDataCollection,
  IHalBaseDataCollectionLinks,
  IHalResponseCollection,
  IHalResponseCollectionLinks,
} from "./types/types.collection";
import {
  IHalEmbededObject,
  IHalBaseDataObject,
  IHalResponseObject,
} from "./types/types.object";

util.inspect.defaultOptions.depth = null;

/**
 *
 * @param data
 * @returns
 */
const prepareEmbededData = (embededObject: IHalEmbededObject | undefined) => {
  if (embededObject) {
    return generateHalObjectResponse({
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
export const generateHalObjectResponse = (baseData: IHalBaseDataObject) => {
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

const prepareCollectionLinks = (links: IHalBaseDataCollectionLinks) => {
  const response: IHalResponseCollectionLinks = {
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

export const generateHalCollectionResponse = (
  baseData: IHalBaseDataCollection
) => {
  const response: IHalResponseCollection = {
    _links: prepareCollectionLinks(baseData.links),
    count: baseData.data.length,
    total: baseData.total,
    _embeded: {
      [baseData.collectionName]: baseData.data,
    },
  };

  return response;
};

console.log(
  generateHalCollectionResponse({
    links: {
      selfUrl: "localhost?page=3",
      firstUrl: "localhost/",
      lastUrl: "localhost?page=4",
      nextUrl: "localhost?page=4",
      prevUrl: "localhost?page=2",
    },
    data: [
      {
        identifier: 1,
        name: "Marcus",
        isAlive: true,
        _embeded: undefined,
      },
      {
        identifier: 3,
        name: "Mark",
        isAlive: true,
        _embeded: undefined,
      },
    ],
    total: 5,
    collectionName: "users",
  })
);
