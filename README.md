# next-testcafe-build
Use testcafe-react-selectors on Next.js production build



# Next.js + testcafe-react-selectors

Use `testcafe-react-selectors` in your Next.js project on a production build. 

Due to `uglify` some information needed by `testcafe-react-selectors` are stripped out
in the production build. With this plugin you can create a build with this information 
intact.  


## Installation

```
npm install --save next-testcafe-build
```

or

```
yarn add next-testcafe-build
```

### Usage with environment variables

Create a next.config.js

```js
const withTestcafeBuild = require("next-testcafe-build");

module.exports = withTestcafeBuild({
  testcafeBuild: process.env.BUILD_TARGET === 'testcafe'
});
```

Then you can run this command:

```bash
# build for testing with testcafe-react-selectors
BUILD_TARGET=testcafe yarn build

# normal production build
yarn build
```
