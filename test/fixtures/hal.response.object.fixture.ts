import { IHalObjectRequest } from "../../src/types/types.object";

export const basicObject: IHalObjectRequest = {
  url: "http://localhost:8080/api/users",
  data: {
    identifier: 1,
    name: "Marcus",
    isAlive: true,
    _embeded: undefined,
  },
};

export const basicObject1: IHalObjectRequest = {
  url: "http://localhost:8080/api/users",
  data: {
    identifier: 2,
    name: "Markus",
    isAlive: false,
    _embeded: undefined,
  },
};

export const basicObject2: IHalObjectRequest = {
  url: "http://localhost:8080/api/users",
  data: {
    identifier: 3,
    name: "Marly",
    isAlive: false,
    _embeded: undefined,
  },
};

export const basicObject3: IHalObjectRequest = {
  url: "http://localhost:8080/api/users",
  data: {
    identifier: 4,
    name: "Kane",
    isAlive: true,
    _embeded: undefined,
  },
};

export const complexObject: IHalObjectRequest = {
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

export const complexObjectWithCollection: IHalObjectRequest = {
  ...basicObject,
  data: {
    ...basicObject.data,
    _embeded: [
      {
        identifier: 10,
        name: "Klei",
        url: "http://localhost:8080/api/pets",
        _embeded: undefined,
      },
      {
        identifier: 11,
        name: "Kleider",
        url: "http://localhost:8080/api/pets",
        _embeded: [
          {
            identifier: 20,
            name: "test",
            url: "http://localhost:8080/api/bow",
            _embeded: undefined,
          },
        ],
      },
    ],
  },
};

export const basicObjects = [
  basicObject.data,
  basicObject1.data,
  basicObject2.data,
  basicObject3.data,
];
