import { IHalObject } from "./types.object";

interface IHalCollectionResponseLinks {
  self: {
    href: string;
  };
  first: {
    href: string;
  };
  prev: {
    href: string;
  };
  next: {
    href: string;
  };
  last: {
    href: string;
  };
}

export interface IHalCollectionLinks {
  selfUrl: string;
  firstUrl: string;
  prevUrl: string;
  nextUrl: string;
  lastUrl: string;
}

export interface IHalCollectionRawRequest {
  links: IHalBaseDataCollectionLinks;
  data: IHalObject[];
  total: number;
  collectionName: string;
  page: number;
}

export interface IHalCollectionResponse {
  _links: IHalCollectionResponseLinks;
  count: number;
  total: number;
  _embeded: {
    [key: string]: IHalObject[];
  };
  page: number;
}

export interface IHalCollectionRequest {
  data: IHalObject[];
  chunk: number;
  page: number;
  url: string;
  collectionName: string;
  queryParams?: string;
}
