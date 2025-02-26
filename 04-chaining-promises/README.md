# Chaining Promises

## Exercise 1

Just as we did with mapPromise, we want to envision a new way of transforming promises: chaining them.  We want to be able to have one promise resolve, then when it's done, use its value to start a second async process that returns a promise.

WE DON'T WANT TO START THAT SECOND PROCESS UNTIL AFTER THAT FIRST PROCESS RESOLVES!  In this way, we can imagine that we may need some artifact from the first process before we can start the second.  For instance, we may want to create a User object in a database, get an id back, and then use that UserId to create a series of, say, services that this user can access.

This chaining is a common problem in async, so let's create a function to do this.

## Exercise 2

I'm sure you're already a few steps ahead of me here, but just like with transforming promises with synchronous promises, we have a method to do this: `.then(cb)`!

If you return a promise from your callback to .then, you won't have a promise of a promise of some value.  It'll just kinda smoosh them together, so a promise of a promise of a promise of an array just becomes a promise of an array.

Let's practice that!  You're going to create an example like the one above, which will use `.then(cb)` to transform the value of a promise using another async process.  It's a little hairy.

## Exercise 3

The most common point of this scenario is to chain two async processes, especially when the some result of the first one is needed before we can start the second.  This is a very common technique, and we're going to use it to implement a somewhat more "real-world" scenario.

Our situation is that we have two api calls, one that gets a user object by id, and one that gets an organization object by id.  The user object might look like this:

```js
{
  id: 'u001',
  name: 'Mike',
  email: 'mike@mike.mike',
  organizationId: 'o001'
}
```

The organization object might look like this:

```js
{
  id: 'o001',
  name: 'Research and Development'
}
```

We want to make a function that combines these two calls into one, making an object that looks like the following:

```js
{
  id: 'u001',
  name: 'Mike',
  email: 'mike@mike.mike',
  organizationId: 'o001'
  organization: {
    id: 'o001',
    name: 'Research and Development'
  }
}
```

We can't get the organization object until we have the user object and the organization id.  That means that we have to request the user, wait until we have it, then request the organization, wait for it to return, and return a combined object.

It's also worth noting that the getUserById function will resolve with undefined if no user is found with that id.  Then we don't have to request the organization at all!

For this example, the test creates the getUserById and getOrganizationById functions, then passes them to a function that itself returns the function we want to build: one which takes in a userId and returns a combined object.

## Exercise 4

Building on the scenario from Exercise 3, let's assume that we are now given both the user's userId and organizationId. This means we can now fetch the user and organization objects from their respective databases simultaneously. Doing both calls "in parallel" reduces network latency, making our app more responsive.

Refactor your code from exercise 3 so that the objects are fetched simultaneously before merging them. If either user or organization id is not found, then the result should still be `undefined`.

**Hint:** have a look at the documentation of [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) and see if you can make use of this function to simplify the task of waiting on two promises.

## Exercise 5

In this exercise we go back to the setup of exercise 3: you are given just the user id, and need to fetch the user and then, based on the retrieved organization id, fetch the user's organization info.

However, this time around, we will retrieve the user information in batch. So instead of a single user id, your function is given an *array* of user ids. Your task is to fetch the information of all the users from the database.

The order in which you retrieve the user or organization information from the database does not matter, as long as you return the enriched user information in the same order as the input user id's.

Your function should return an array of objects, with the same length as the input array. If the data for any user or organization is missing in the database, the resulting position in the output array should be set to `undefined`.