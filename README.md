# IPFS Platform

A modular platform for hosting data that will allow developers to easily create their own plugins for using that data.

## Prerequisites

1. [NodeJS](https://nodejs.org/)

## Quickstart

Run the server locally as follows:

```
npm install
npm start
```

## Project Scaffolding

The `src` directory contains the source code for the server and is written in JavaScript. This source code 
is transpiled to the `lib` directory for deployment and testing.
1. `npm run build` will transpile the `src` directory into `lib`
2. `npm run clean` will delete the transpiled code.

## Debugging

To debug with VS Code you will need to: 
1. Select the `Debug` tab
2. Choose the `Add Configuration` option from the debug dropdown list
3. Select `Node.js` for the debug environment
4. Finally add the following configuration to the auto generated launch.json:

```
"configurations": [
  {
    "type": "node",
    "request": "launch",
    "name": "Launch Program via Babel",
    "program": "${workspaceFolder}/src/app.js",
    "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/babel-node",
    "cwd": "${workspaceFolder}"
  }
]
```

## Testing

Mocha, Chai and Supertest are currently used for testing.  Each api route should be tested mocking out databases and
functionality as required.  The logging level for the tests is set to `error` which will hide all logs except errors.

```
npm test
```

## Linting

The project is using ESLint as the linter. The configuration for this is stored in `.eslintrc.json`. You can use the following commands:
1. `npm run lint` to run ESLint.
2. `npm run lint:fix` to run ESLint with the --fix prefix which will automatically fix certain linting errors.

## Docker

There is a Dockerfile based off the Node image that can be used to run the IPFS Platform in a container.
