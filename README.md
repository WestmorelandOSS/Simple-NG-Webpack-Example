### NG Quickstart with Webpack

Big changes were to remove the lite-server config and let webpack-dev-server do the dirty work.

Also I switched the `tsconfig` to use `commonjs` as opposed to `system` so I don't have to employ another loader with webpack for now.

There is an issue with rxjs as an include I think I just need to externalize it for webpack to remove the warning. But the app works.

#### Setup
1. install node 5.5.0
    - If you are using avn and nvm this will all work automatically
2. run `npm install`
3. Optional: install `webpack` globally
    - `npm install -g webpack`

#### Run
1. `npm start`
2. open `localhost:8080`
