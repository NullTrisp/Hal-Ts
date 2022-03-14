import assert from "assert";
import mocha from "mocha";
import { getHalObjectResponse } from "../src";
import {
  isHalObjectResponse,
  isHalObjectResponseArray,
} from "../src/actions/object";
import { IHalEmbededObject, IHalObjectResponse } from "../src/types/object";
import {
  basicObject,
  complexObject,
  complexObjectWithCollection,
  complexObjectWithCollectionAndEmbededCollection,
} from "./fixtures/hal.response.object.fixture";

mocha.describe("Test Hal Object Response", () => {
  mocha.it("Should create response for basic object", (done) => {
    const response = getHalObjectResponse(basicObject);

    assert.strictEqual(
      response._links.self.href,
      `${basicObject.url}/${basicObject.data.identifier}`
    );
    assert.strictEqual(response._embeded, basicObject.data._embeded);
    assert.strictEqual(response.identifier, basicObject.data.identifier);

    done();
  });

  mocha.it("Should create response for complex object", (done) => {
    const response = getHalObjectResponse(complexObject);

    assert.strictEqual(
      response._links.self.href,
      `${complexObject.url}/${complexObject.data.identifier}`
    );

    assert.strictEqual(isHalObjectResponse(response._embeded), true);
    assert.strictEqual(response._embeded?.length, undefined);
    assert.strictEqual(
      (response._embeded as IHalObjectResponse)._links.self.href,
      `${(complexObject.data._embeded as IHalEmbededObject).url}/${
        (complexObject.data._embeded as IHalEmbededObject)?.identifier
      }`
    );

    done();
  });

  mocha.it(
    "Should create response for complex object with collection",
    (done) => {
      const response = getHalObjectResponse(complexObjectWithCollection);

      assert.strictEqual(
        response._links.self.href,
        `${complexObjectWithCollection.url}/${complexObjectWithCollection.data.identifier}`
      );

      assert.strictEqual(isHalObjectResponseArray(response._embeded), true);
      assert.strictEqual(response._embeded?.length, 2);
      assert.strictEqual(
        (response._embeded as IHalObjectResponse[])[0]._links.self.href,
        `${
          (complexObjectWithCollection.data._embeded as IHalEmbededObject[])[0]
            .url
        }/${
          (complexObjectWithCollection.data._embeded as IHalEmbededObject[])[0]
            ?.identifier
        }`
      );

      done();
    }
  );

  mocha.it(
    "Should create response for complex object with embeded collection",
    (done) => {
      const response = getHalObjectResponse(
        complexObjectWithCollectionAndEmbededCollection
      );

      assert.strictEqual(
        response._links.self.href,
        `${complexObjectWithCollectionAndEmbededCollection.url}/${complexObjectWithCollectionAndEmbededCollection.data.identifier}`
      );

      assert.strictEqual(isHalObjectResponseArray(response._embeded), true);
      assert.strictEqual(response._embeded?.length, 1);

      done();
    }
  );
});
