export interface IHalObject {
  identifier: number | string;
  [key: string]: unknown;
  _embeded: IHalEmbededObject | undefined;
}

export interface IHalEmbededObject extends IHalObject {
  url: string;
  _embeded: IHalEmbededObject | undefined;
}

export interface IHalBaseDataObject {
  url: string;
  data: IHalObject;
}
export interface IHalResponseObject {
  _links: {
    self: {
      href: string;
    };
  };
  [key: string]: unknown;
  _embeded: IHalResponseObject | undefined;
}
