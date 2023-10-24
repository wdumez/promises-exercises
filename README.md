# promises-exercises

Set of exercises in using JS promises for handling asynchronous operations.

Adapted from [this repository](https://github.com/lighthouse-labs/promises-exercises) by Lighthouse Labs.

## Setup

Verify that `node --version` returns at least `v19.0.0` or later.
If not, install a recent version of node.js per the standard [installation instructions](https://nodejs.org/en/download/package-manager).

1. Fork or clone this repository.
2. Run `npm install` to download the Node modules.

## Using

For these exercises, there are a few folders, each corresponding to a step in the lesson. Each of them has a `README.md`, a `test.js`, and an `answers.js`.  Read the `README.md` for further instructions, implement the methods in the `answers.js`, passing the tests in the `tests.js` file.

You are free to look at any of the tests for guidance, but don't change them.

> To run the tests of the exercises in a directory like `01-making-promises`, execute `npm run 01-making-promises` from the top-level project directory.

## Outline

* `npm run 01-making-promises` - Create promises with Promise.resolve, Promise.reject, and the Promise constructor.
* `npm run 02-consuming-promises` - Use `.then(cb)` and `.catch(cb)` to respond to a promise completing and do something with the result.
* `npm run 03-transforming-promises` - Use `.then(cb)` and `.catch(cb)` to transform the results of async processes.
* `npm run 04-chaining-promises` - Use `.then(cb)` and `.catch(cb)` to chain async processes.
* `npm run 05-callbacks` - Turn callback-centric functions into promise-centric functions.
* `npm run 06-async-functions` - Turn promise-centric functions into `async` functions. Refactor code that uses `.then(cb)` to use sequential control flow instead.

> Tip:  To run any of the exercises above in watch mode, add `-- --watch`, (e.g. `npm run 01-making-promises -- --watch`)