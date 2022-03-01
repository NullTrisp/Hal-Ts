import { IHalBaseDataObject } from "../../src/types/types.object";

export const basicObject: IHalBaseDataObject = {
  url: "http://localhost:8080/api/users",
  data: {
    identifier: 1,
    name: "Marcus",
    isAlive: true,
    _embeded: undefined,
  },
};

export const complexObject: IHalBaseDataObject = {
  ...basicObject,
  data: {
    ...basicObject.data,
    _embeded: {
      identifier: 10,
      name: "Klei",
      url: "http://localhost:8080/api/pets",
      _embeded: undefined,
    },
  },
};
