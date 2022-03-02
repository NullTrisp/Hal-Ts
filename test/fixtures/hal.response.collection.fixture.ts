import { IHalCollectionRequest } from "../../src/types/types.collection";
import { basicObjects } from "./hal.response.object.fixture";

export const collectionRequest: IHalCollectionRequest = {
  data: basicObjects,
  chunk: 2,
  page: 1,
  url: "http://localhost:8080/api/users",
  collectionName: "users",
};
