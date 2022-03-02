export interface IHalObject {
  identifier: number | string;
  [key: string]: unknown;
  _embeded: IHalEmbededObject | IHalEmbededObject[] | undefined;
}

export interface IHalEmbededObject extends IHalObject {
  url: string;
  _embeded: IHalEmbededObject | undefined;
}

export interface IHalObjectRequest {
  url: string;
  data: IHalObject;
}
export interface IHalObjectResponse {
  _links: {
    self: {
      href: string;
    };
  };
  [key: string]: unknown;
  _embeded: IHalObjectResponse | IHalObjectResponse[] | undefined;
}
