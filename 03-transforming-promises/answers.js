/**
 * 
 * EXERCISE 1
 * 
 * @param {*} promise 
 * @param {*} transformer 
 * @returns {Promise}
 */
function mapPromise(promise, transformer) {
  return new Promise((resolve, reject) => {
    promise
      .then((value) => resolve(transformer(value)))
      .catch((error) => reject(error))
  });
}

/**
 * 
 * EXERCISE 2
 * 
 * @param {Promise<number | string>} numberPromise 
 * @returns {Promise<number>}
 */
function squarePromise(numberPromise) {
  return numberPromise
    .then(
      (value) => {
        let parsedValue = Number.parseInt(value);
        if (Number.isNaN(parsedValue)) {
          throw `Cannot convert '${value}' to a number!`
        } else {
          return parsedValue * parsedValue;
        }
      }
    )
    .catch((error) => { throw error });
}

/**
 * EXERCISE 3
 * 
 * @param {Promise<number | string>} promise 
 * @returns {Promise<number>}
 */
function squarePromiseOrZero(promise) {
  return squarePromise(promise)
    .catch((error) => { return 0 });
}

/**
 * EXERCISE 4
 * 
 * @param {Promise} promise 
 * @returns {Promise}
 */
function switcheroo(promise) {
  return promise.then(
    (value) => { throw value },
    (error) => { return error }
  );
}

/**
 * @callback consumer
 * @param {*} value
 */

/**
 * @callback handler
 * @param {*} error
 */

module.exports = {
  mapPromise,
  squarePromise,
  squarePromiseOrZero,
  switcheroo,
};