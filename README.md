# Replit's graphql module Node.js

A module to easily interact with Replit's graphql API!

**This module includes:**
* `fetch`: A function to fetch the data from the endpoint
* `getUser`: A function to get some informations on a user
* `getRepl`:A function to get some informations on a repl
* `buildRequest`: A function to get the body of  the request (JSON)
* `buildQuery`: A function to build the query from an object
* `getPossibleTargets`: Return an array with the possible targets
* `getInfosOnTarget`: return some infos on a target

### Import the module
```js
import GraphQL from 'replit-graphql-api'
```

### Fetch data
```js
import { fetch } from 'replit-graphql-api'

fetch({
  operationName: 'UserCard',
  query: `
    query UserCard($username: String!) {
      userByUsername(username: $username) {
        id
        fullName
        username
        url
        bio
        image
        followerCount
        followCount
      }
    }
  `,
  variables: {
    username: 'nathanTi'
  }
})
```

> **Note:**
> The following funtions will build the query themselves.


### Get a user's data
```js
import { getUser } from 'replit-graphql-api'

getUser({
  // the username
  username: 'nathanTi',

  // the infos you want to access to (optionnal, default is ['id', 'title', 'timeCreated', 'imageUrl', 'description', 'commentCount'])
  fields: [
    'id',
    'fullName',
    'username',
    'url',
    'bio',
    'image',
    'followerCount',
    'followCount'
  ]
})
  .then(data => {
    console.log(data);
  })

// Result:
{
  user: {
    id: '...',
    fullName: '...',
    username: '...'
    // ...
  }
}
```

### Get a repl's data
To find a repl, you can search it with it's url or it's id
```js
import { getRepl } from 'replit-graphql-api'

getRepl({
  // the username
  url: '/@<username>/<repl-name>',

  // the infos you want to access to (optionnal, default is ['id', 'title', 'timeCreated', 'imageUrl', 'description', 'commentCount']
  fields: ['id', 'title', 'timeCreated', 'imageUrl', 'description', 'commentCount']
})
  .then(data => {
    console.log(data);
  })

// Result:
{
  repl: {
    id: '...',
    title: '...',
    timeCreated: '...'
    // ...
  }
}
```

### The `buildRequest` module

This function can be used to build a qraphql query.
In the `fields`, you can specify a simple info, 
```js
import { fetch, buildRequest } from 'replit-graphql-api'

const request = buildRequest({
  // the typename of the thing you want to search
  target: 'Repl',

  // the data you want to access to
  fields: [
    'id',
    'title',

    // you can access to more complex data, as the infos on the owner of the repl
    {
      name: 'owner',
      fields: [
        'id',
        'username',
        'fullName'
      ]
    }
  ],

  // the variables to access to the data
  variables: {

    // YOu search a repl, so you set the variables to search for the repl here
    Repl: {
      url: '/@<username>/<repl-name>'
    }
  }
});

fetch(request)
  .then(data => {
    console.log(data);
  });

// Result:
{
  repl: {
    id: '...',
    title: '...',
    owner: {
      id: '...',
      username: '...',
      fullName: '...'
    }
  }
}
```

### The `buildQuery` module

This function can be used to build a qraphql query:
```js
import { buildQuery }

const query = buildQuery({
  target: 'Repl',
  fields: [
    'id',
    'title',
    {
      name: 'owner',
      fields: [
        'id',
        'username',
        'fullName'
      ]
    }
  ],
  variables: {
    Repl: {
      url: '/@<username>/<repl-name>'
    }
  }
});
```

### Get all possible targets
```js
import { getPossibleTargets } from 'replit-graphql-api'

console.log(getPossibleTargets())
```

### Get some infos on a target
```js
import { getInfosOnTarget } from 'replit-graphql-api'

console.log(getInfosOnTarget('Repl'))
```