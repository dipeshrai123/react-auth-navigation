# react-auth-navigation



>  *React library for authenticated routes*



[![NPM](https://shields.io/npm/v/react-auth-navigation.svg)](https://www.npmjs.com/package/react-auth-navigation) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)



## Install

```bash
// with npm
npm i react-auth-navigation

// with yarn
yarn add react-auth-navigation
```



## Why is react-auth-navigation ?

It is a react library built on top of **react-router-dom**. React Auth Navigation provides us to create an authenticated routes and manages all the complicated routing and authenticating the users in client-side.



## Usage

### Navigation

Before we dive into creating authenticated routes, we should have some concept of **public**, **private** and **protected** routes.

But, What exactly are public, private and protected routes ?

- **Public Routes** are those routes which can be accessed with or without login.
- **Private routes** are those routes which cannot be accessed without login.
- **Protected routes** are those types of public routes which cannot be accessed if a user is logged in.

Now Lets create authenticated routes.



#### withNavigation()

**withNavigation()** is responsible for managing all routes and userRoles. **withNavigation()** hoc should be exported from root component. It accepts **Component** as _first argument_ and **Configuration Object** as _second argument_.

Let us configure the _second argument_.

- **routerType** _( optional )_ : It can be either "hash" or "browser". Default "browser".

- **publicPaths** accepts an array of object with following keys:

  - **key** _( string ) ( optional )_ : Defines unique key for each navigation route.
  - **name** _( string )_ : Defines the name for a path and used as a routes key for **useNavigation()** hook keys if key is not passed.
  - **path** _( string )_ : Defines the path for a component.
  - **component** _( Component )_ : Defines a component for a path.
  - **restricted** _( boolean )_ : If **true** then it is **protected** route otherwise **public**.
  - **subPaths** _( array ) ( optional )_ : Accepts array of object with same as **publicPaths** array. It is used to make sub routes _( full-page routing )_.
  - **nestedPaths** _( array ) ( optional )_ : Accepts array of object with same as **publicPaths** array. It is used to make nested routes _( component routing )_.

- **privatePaths** accepts an array of object with following keys:

  - **key** _( string ) ( optional )_ : Defines unique key for each navigation route.
  - **name** _( string )_ : Defines the name for a path and used as a routes key for **useNavigation()** hook keys if key is not passed.
  - **path** _( string )_ : Defines the path for a component.
  - **component** _( Component )_ : Defines a component for a path.
  - **subPaths** _( array ) ( optional )_ : Accepts array of object with same as **publicPaths** array. It is used to make sub routes _( full-page routing )_.
  - **nestedPaths** _( array ) ( optional )_ : Accepts array of object with same as **publicPaths** array. It is used to make nested routes _( component routing )_.

- **userRoles** is used to define the access routes for a particular user roles. accepts an object with following format:

  ```typescript
  ...
  userRoles: {
      ...
      [userRole: string] : { access: Array<string> }
  }
  ```



**Example**

Basic example of routing. 

First create **publicPaths**, **privatePaths** and **userRoles**.

```javascript
// routes.js

import Page1 from "./Pages/Page1";
import Page2 from "./Pages/Page2";

export const publicPaths = [
  {
    name: "Public",
    path: "/public",
    component: Page1,
    restricted: true,
  },
];

export const privatePaths = [
  {
    name: "Private",
    path: "/private",
    component: Page2,
  },
];

export const userRoles = { 
    user: { access: ["/public"] }, 
    admin:  { access: ["*"] }, // '*' defines to give access to all paths.
};
```

Now lets use this with **withNavigation()** hoc.

```javascript
// app.js
import React from "react";
import { withNavigation } from "react-auth-navigation";
import { publicRoutes, privateRoutes, userRoles } from "./routes";

const App = () => {
  return (
    // ...
  );
};

export default withNavigation(App, {
  publicPaths,
  privatePaths,
  userRoles,
});
```

And that's it. Its all you should do to define the routes and user-roles. 

## License

MIT © [dipeshrai123](https://github.com/dipeshrai123)