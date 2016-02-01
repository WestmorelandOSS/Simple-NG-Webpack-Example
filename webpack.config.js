var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname + "/src",
  devtool: '#source-map',
  debug: true,
  // cache: false,

  // our angular app
  entry: { app: './app.ts'},

  // Config for our build files
  output: {
    path: __dirname + "/dist",
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },


  resolve: {
    // ensure loader extensions match
    extensions: prepend(['.ts','.js','.json','.css','.html'], '.async') // ensure .async.ts etc also works
  },

  module: {
    preLoaders: [
      { test: /\.js$/, loader: "source-map-loader", exclude: [ __dirname + 'node_modules/rxjs' ] }
    ],
    loaders: [
      // Support Angular 2 async routes via .async.ts
      { test: /\.async\.ts$/, loaders: ['es6-promise-loader', 'ts-loader'], exclude: [ /\.(spec|e2e)\.ts$/ ] },
      // Support for .ts files.
      { test: /\.ts$/, loader: 'ts-loader', exclude: [ /\.(spec|e2e|async)\.ts$/ ] },
      // Support for *.json files.
      { test: /\.json$/,  loader: 'json-loader' }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true)
  ],

  // Other module loader config
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },
  // we need this due to problems with es6-shim
  node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
};

// Helper functions
function prepend(extensions, args) {
  args = args || [];
  if (!Array.isArray(args)) { args = [args] }
  return extensions.reduce(function(memo, val) {
    return memo.concat(val, args.map(function(prefix) {
      return prefix + val
    }));
  }, ['']);
}
