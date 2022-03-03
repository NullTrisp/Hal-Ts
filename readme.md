# Hal-Ts

package to create API data responses in [Hal format](https://stateless.group/hal_specification.html)

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

If this is a brand new project, make sure to create a `package.json` first with
the [ `npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[ `npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install hal-ts
```

## Examples

### Data Object

```js
import halts from "hal-ts";

const halResponse = generateObjectResponse({
    url: "http://localhost:8080/api/users",
    data: {
        identifier: 1,
        name: "Marcus",
        isAlive: true,
        _embeded: undefined,
    },
})
```

```js
import halts from "hal-ts";

const halResponse = generateObjectResponse({
    url: "http://localhost:8080/api/users",
    data: {
        identifier: 1,
        name: "Marcus",
        isAlive: true,
        _embeded: [{
            identifier: 2,
            name: "Mark",
            isAlive: false,
            _embeded: undefined,
        }],
    },

})
```

```js
import halts from "hal-ts";

const halResponse = generateObjectResponse({
    url: "http://localhost:8080/api/users",
    data: {
        identifier: 1,
        name: "Marcus",
        isAlive: true,
        _embeded: {
            identifier: 10,
            name: "Klei",
            url: "http://localhost:8080/api/pets",
            _embeded: undefined,
        },
    },
})
```

### Collections

```js
import halts from "hal-ts";

const arrayData = [{
        url: "http://localhost:8080/api/users",
        data: {
            identifier: 1,
            name: "Marcus",
            isAlive: true,
            _embeded: undefined,
        }
    },
    {
        url: "http://localhost:8080/api/users",
        data: {
            identifier: 2,
            name: "Markus",
            isAlive: false,
            _embeded: undefined,
        },
    } {
        url: "http://localhost:8080/api/users",
        data: {
            identifier: 3,
            name: "Marly",
            isAlive: false,
            _embeded: undefined,
        },
    },
    {
        url: "http://localhost:8080/api/users",
        data: {
            identifier: 4,
            name: "Kane",
            isAlive: true,
            _embeded: undefined,
        },
    }
];

const baseData = {
    data: arrayData;
    chunk: 2;
    page: 2;
    url: "http://localhost/api/users";
    collectionName: "users";
}

const halResponse = getCollectionResponse(baseData);
```
