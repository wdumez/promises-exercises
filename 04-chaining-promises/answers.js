/**
 * 
 * EXERCISE 1
 * 
 * @param {Promise} promise 
 * @param {function} asyncTransformer 
 */
function flatMapPromise(promise, asyncTransformer) {
  return new Promise((resolve, reject) => {
    promise
      .then(
        (value) => {
          resolve(asyncTransformer(value));
        },
        (error) => {
          reject(error);
        });
  });
}

/**
 * 
 * EXERCISE 2
 * 
 * @param {Promise} firstPromise 
 * @param {function} slowAsyncProcess 
 */
function chainTwoAsyncProcesses(firstPromise, slowAsyncProcess) {
  return firstPromise.then(
    (value) => {
      return slowAsyncProcess(value);
    }
  );
}

/**
 * 
 * EXERCISE 3
 * 
 * @param {function} getUserById 
 * @param {function} getOrganizationById 
 */
function makeGetUserByIdWithOrganization(getUserById, getOrganizationById) {
  return function getUserByIdWithOrganization(userId) {
    return getUserById(userId)
      .then(
        (userObject) => {
          if (userObject) {
            return getOrganizationById(userObject.organizationId)
              .then((organizationObject) => {
                if (organizationObject) {
                  let newObject = userObject;
                  newObject.organization = organizationObject;
                  return newObject;
                } else { return undefined }
              })
          } else { return undefined }
        }
      )
  };
}

/**
 * 
 * EXERCISE 4
 * 
 * @param {function} getUserById 
 * @param {function} getOrganizationById 
*/
function makeGetUserAndOrganizationById(getUserById, getOrganizationById) {
  /**
   * @param {string} userId
   * @param {string} organizationId
   */
  return function getUserByIdWithOrganization(userId, organizationId) {
    let userObject = getUserById(userId);
    let organizationObject = getOrganizationById(organizationId);
    return Promise.all([userObject, organizationObject])
      .then(
        ([userObject, organizationObject]) => {
          if (userObject && organizationObject) {
            let newObject = userObject;
            newObject.organization = organizationObject;
            return newObject;
          } else {
            return undefined;
          }
        })
  };
}

/**
 * 
 * EXERCISE 5
 * 
 * @param {function} getUserById 
 * @param {function} getOrganizationById 
 */
function makeGetUsersByIdWithOrganizations(getUserById, getOrganizationById) {
  /**
   * @param {Array<string>} userIds
   */
  return function getUserByIdWithOrganization(userIds) {
    // We don't want to return an array of promises,
    // but rather a promise containing an array of values.
    return Promise.all(userIds.map((userId) => {
      // Same as exercise 3:
      return getUserById(userId)
        .then(
          (userObject) => {
            if (userObject) {
              return getOrganizationById(userObject.organizationId)
                .then((organizationObject) => {
                  if (organizationObject) {
                    let newObject = userObject;
                    newObject.organization = organizationObject;
                    return newObject;
                  } else { return undefined }
                })
            } else { return undefined }
          }
        )
    })
    )
  };
}

module.exports = {
  flatMapPromise,
  chainTwoAsyncProcesses,
  makeGetUserByIdWithOrganization,
  makeGetUserAndOrganizationById,
  makeGetUsersByIdWithOrganizations,
};