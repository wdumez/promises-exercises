
/**
 * 
 * EXERCISE 1
 * 
 * @returns {Promise<3>}
 */
async function makePromiseResolveWith3() {
  return 3;
}

/**
 * 
 * EXERCISE 2
 * 
 * @returns {Promise<,"Boo!">}
 */
async function makePromiseRejectWithBoo() {
  throw "Boo!";
}

/**
 * 
 * EXERCISE 3
 * 
 * @param {Promise} firstPromise 
 * @param {function} slowAsyncProcess 
 */
async function chainTwoAsyncProcesses(firstPromise, slowAsyncProcess) {
  let arg = await firstPromise;
  let result = await slowAsyncProcess(arg);
  return result;
}

/**
 * 
 * EXERCISE 4
 * 
 * @param {function} getUserById 
 * @param {function} getOrganizationById 
 */
function makeAsyncGetUserByIdWithOrganization(getUserById, getOrganizationById) {
  /**
   * @param {string} userId 
   */
  return async function getUserByIdWithOrganization(userId) {
    let userObject = await getUserById(userId);
    if (!userObject) {
      return undefined
    }
    let organizationObject = await getOrganizationById(userObject.organizationId);
    if (!organizationObject) {
      return undefined
    }
    let newObject = userObject;
    newObject.organization = organizationObject;
    return newObject;
  };
}

/**
 * 
 * EXERCISE 5
 * 
 * @param {function} getUserById 
 * @param {function} getOrganizationById 
 */
function makeAsyncGetUserAndOrganizationById(getUserById, getOrganizationById) {
  /**
   * @param {string} userId 
   * @param {string} organizationId
  */
  return async function getUserByIdWithOrganization(userId, organizationId) {
    let [userObject, organizationObject] = await Promise.all(
      [getUserById(userId), getOrganizationById(organizationId)]
    )
    if (userObject && organizationObject) {
      return { ...userObject, organization: organizationObject };
    } else {
      return undefined;
    }
  };
}

/**
 * 
 * EXERCISE 6
 * 
 * @param {function} getUserById 
 * @param {function} getOrganizationById 
 */
function makeAsyncGetUsersByIdWithOrganizations(getUserById, getOrganizationById) {
  /**
   * @param {Array<string>} userIds
   */
  return async function getUserByIdWithOrganization(userIds) {
    const userObjects = await Promise.all(
      userIds.map((userId) => {
        return getUserById(userId)
      })
    );
    const organizationObjects = await Promise.all(
      userObjects.map((userObject) => {
        if (!userObject) {
          return undefined
        }
        return getOrganizationById(userObject.organizationId)
      })
    );
    return await Promise.all(
      userObjects.map((userObject, idx) => {
        if (!(userObject && organizationObjects[idx])) {
          return undefined
        }
        return { ...userObject, organization: organizationObjects[idx] }
      })
    )
  };
}


module.exports = {
  makePromiseResolveWith3,
  makePromiseRejectWithBoo,
  chainTwoAsyncProcesses,
  makeAsyncGetUserByIdWithOrganization,
  makeAsyncGetUserAndOrganizationById,
  makeAsyncGetUsersByIdWithOrganizations,
};