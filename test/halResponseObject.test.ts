import assert from "assert";
import mocha from "mocha";
import { generateHalObjectResponse } from "../src";
import {
  basicObject,
  complexObject,
} from "./fixtures/halResponseObject.fixture";

mocha.describe("Test Object Response", () => {
  mocha.it("Should create response for basic object", (done) => {
    const response = generateHalObjectResponse(basicObject);

    assert.strictEqual(
      response._links.self.href,
      `${basicObject.url}/${basicObject.data.identifier}`
    );

    assert.strictEqual(response._embeded, basicObject.data._embeded);

    assert.strictEqual(response.identifier, basicObject.data.identifier);

    done();
  });

  mocha.it("Should create response for complex object", (done) => {
    const response = generateHalObjectResponse(complexObject);

    assert.strictEqual(
      response._links.self.href,
      `${complexObject.url}/${complexObject.data.identifier}`
    );

    assert.strictEqual(
      response._embeded?._links.self.href,
      `${complexObject.data._embeded?.url}/${complexObject.data._embeded?.identifier}`
    );

    done();
  });
});
