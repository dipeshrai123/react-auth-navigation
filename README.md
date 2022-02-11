# react-auth-navigation

> React library for authenticated routes

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
  - **props** _( any ) ( optional )_ : Defines the props for each route keys.

- **privatePaths** accepts an array of object with following keys:

  - **key** _( string ) ( optional )_ : Defines unique key for each navigation route.
  - **name** _( string )_ : Defines the name for a path and used as a routes key for **useNavigation()** hook keys if key is not passed.
  - **path** _( string )_ : Defines the path for a component.
  - **component** _( Component )_ : Defines a component for a path.
  - **subPaths** _( array ) ( optional )_ : Accepts array of object with same as **publicPaths** array. It is used to make sub routes _( full-page routing )_.
  - **nestedPaths** _( array ) ( optional )_ : Accepts array of object with same as **publicPaths** array. It is used to make nested routes _( component routing )_.
  - **props** _( any ) ( optional )_ : Defines the props for each route keys.

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
  admin: { access: ["*"] }, // '*' defines to give access to all paths.
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

### Auth

Auth provides 2 different HOCs which handles all the authentications defined by **withNavigation()** HOC.

#### Auth

It lets you define the current state of a user i.e. ( logged state and logged role ) and allows us to define global state which can be accessed from any component with **useAuth()** hook.

It accepts two props:

- **config** _( object )_

  You must pass an config object to config prop. Object should be of following shape :

  - **isLoggedIn** _( boolean )_ : Defines logged state of a user.
  - **userRole** _( string )_ : Defines current role of a user.

- **state** _( object )_

  It can be used as a global state which can accept any object with any keys.

#### Auth.Screens

It returns all the authenticated screens based on the current state of a user and all the routes provided to **withNavigation()** HOC. Component with **Auth.Provider** hoc should be wrapped with **withNavigation()** hoc.

It can accepts one optional prop:

- **path** _( string ) ( optional )_

It is required for nested routes. By default its value is taken as _null_ or _'/'_;

**Auth.Screens** hoc should be wrapped inside **Auth** hoc.

**Example**

```javascript
// app.js
import { withNavigation, Auth } from "react-auth-navigation";
import { publicPaths, privatePaths, userRoles } from "./routes";

const App = () => {
  const [config, setConfig] = useState({ isLoggedIn: false, userRole: "user" });

  return (
    <Auth
      config={config}
      state={{
        logout: () => {
          setConfig({ isLoggedIn: false, userRole: "user" });
        },
      }}
    >
      <Auth.Screens />
    </Auth>
  );
};

export default withNavigation(App, {
  publicPaths,
  privatePaths,
  userRoles,
});
```

### useNavigation()

**useNavigation()** is a hook which gives access to the navigation object providing you to navigate between different screens, providing you all accessible routes according to the current state of a user ( logged state and logged role ). It is also very useful for a component which is not directly a route defined in public or private paths because it doesn't have access to history prop directly.

**useNavigation()** returns an object with the following properties :

- **navigation** _( object )_

  Object for handling navigation and provides all authenticated routes name and path.

  - **routes** _( object )_ : Object with name key you defined in **publicPaths** and **privatePaths** in **withNavigation()** and values are the object of name and path for a defined key.
  - **navigate** _( string )_ : Function which takes either string or an object similar to _react-router-dom’s_ history.push() function.
  - **goBack** _( function )_ : Function which will navigate to the previous screen.
  - **goForward** _( function )_ : Function which will navigate to the next screen if history is available.

- **history** _( object )_ : History object same as _react-router-doms's_ history object.

- **location** _( object )_ : Location object same as _react-router-dom's_ location object.

- **params** _( object )_ : Params object same as _react-router-dom's_ params object.

**Example**

```javascript
import { useNavigation } from "react-auth-navigation";

const { navigation, history, location, params } = useNavigation();
```

### useAuth()

**useAuth()** is a hook which gives access to the config object and state object defined in **<Auth>** hoc directly. By default it returns an object with **isLoggedIn**, **userRole** and all the keys passed inside the state object.

**Example**

```javascript
import { useAuth } from "react-auth-navigation";

export default function() {

    // config and state can be accessed with useAuth()
    const { isLoggedIn, userRole, logout } = useAuth();

    return () {
        // ...
    }
}
```

## License

MIT © [dipeshrai123](https://github.com/dipeshrai123)
