import { IHalObject } from "./types.object";

interface IHalResponseCollectionLinks {
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

export interface IHalResponseCollection {
  _links: IHalResponseCollectionLinks;
  count: number;
  total: number;
  _embeded: {
    [key: string]: IHalObject[];
  };
}

export interface IHalBaseDataCollectionLinks {
  selfUrl: string;
  firstUrl: string;
  prevUrl: string;
  nextUrl: string;
  lastUrl: string;
}

export interface IHalBaseDataCollection {
  links: IHalBaseDataCollectionLinks;
  data: IHalObject[];
  total: number;
  collectionName: string;
}
