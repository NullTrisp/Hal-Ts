import assert from "assert";
import mocha from "mocha";
import { getCollectionResponse } from "../src";
import { collectionRequest } from "./fixtures/hal.response.collection.fixture";
import {
  InvalidChunkSize,
  InvalidPage,
  PageNotFoundError,
} from "../src/types/error";

mocha.describe("Test Hal Collection Response", () => {
  mocha.it("Should create response for collection ", (done) => {
    const response = getCollectionResponse(collectionRequest);

    assert.strictEqual(
      response._links.self.href,
      "http://localhost:8080/api/users/?page=1"
    );
    assert.strictEqual(
      response._links.first.href,
      "http://localhost:8080/api/users/?page=1"
    );
    assert.strictEqual(
      response._links.prev.href,
      "http://localhost:8080/api/users/?page=1"
    );
    assert.strictEqual(
      response._links.next.href,
      "http://localhost:8080/api/users/?page=2"
    );
    assert.strictEqual(
      response._links.last.href,
      "http://localhost:8080/api/users/?page=2"
    );
    assert.strictEqual(response.count, 2);
    assert.strictEqual(response.total, 4);
    assert.strictEqual(response._embeded.users.length, 2);
    assert.strictEqual(response.page, 1);

    done();
  });

  mocha.it(
    "Should not create response for collection  (page not found)",
    (done) => {
      try {
        collectionRequest.page = 3;
        getCollectionResponse(collectionRequest);
        assert.fail();
      } catch (err) {
        if (err instanceof PageNotFoundError) {
          done();
        }
        assert.fail();
      }
    }
  );

  mocha.it("Should create response for collection ", (done) => {
    collectionRequest.chunk = 4;
    collectionRequest.page = 1;
    const response = getCollectionResponse(collectionRequest);

    assert.strictEqual(
      response._links.self.href,
      "http://localhost:8080/api/users/?page=1"
    );
    assert.strictEqual(
      response._links.first.href,
      "http://localhost:8080/api/users/?page=1"
    );
    assert.strictEqual(
      response._links.prev.href,
      "http://localhost:8080/api/users/?page=1"
    );
    assert.strictEqual(
      response._links.next.href,
      "http://localhost:8080/api/users/?page=1"
    );
    assert.strictEqual(
      response._links.last.href,
      "http://localhost:8080/api/users/?page=1"
    );
    assert.strictEqual(response.count, 4);
    assert.strictEqual(response.total, 4);
    assert.strictEqual(response._embeded.users.length, 4);
    assert.strictEqual(response.page, 1);

    done();
  });

  mocha.it(
    "Should not create response for collection (invalid chunk size)",
    (done) => {
      try {
        collectionRequest.chunk = 0;
        collectionRequest.page = 1;
        getCollectionResponse(collectionRequest);
        assert.fail();
      } catch (err) {
        if (err instanceof InvalidChunkSize) {
          done();
        }
        assert.fail();
      }
    }
  );

  mocha.it(
    "Should not create response for collection (invalid page)",
    (done) => {
      try {
        collectionRequest.chunk = 4;
        collectionRequest.page = 0;
        getCollectionResponse(collectionRequest);
      } catch (err) {
        if (err instanceof InvalidPage) {
          done();
        }
        assert.fail();
      }
    }
  );
});
