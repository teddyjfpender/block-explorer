# EVM Block Explorer

This is a very small EVM block explorer that should work with a set of Alchemy application API keys or a RPC URL for any EVM chain (e.g. Ethereum, Polygon, Moonbeam, etc.). It shows the last 20 blocks and the most recent block's transactions. That's it. You'll likely run into being rate-limited by the data provider if you're using either a public or free account.

## Getting Started
Clone this repository and run `npm install`. Next create a `.env` file in the project's root with `REACT_APP_NETWORK` and `REACT_APP_API_KEY`parameters for your network and API key. TODO: generalise with any rpc-url. To install `@material-ui/core` try adding `--legacy-peer-deps`.

## Available Scripts
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.