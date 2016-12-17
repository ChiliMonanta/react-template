var path = require("path");

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
    publicPath: 'public/'
  },
  module: {
    loaders: [
      // Used for compiling ES2015 JavaScript
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:
        {
          presets:['es2015','react']
        }
       },
      // Used for Bootstrap Less Source Files
      { test: /\.less/, loader: 'style!css!less' },
      // Used for Bootstrap Less Source Files
      {
        test: /\.css/,
        loader: 'style!css'
      },
      // Used for Bootstrap Glyphicon Fonts
      { test: /\.(woff2|woff|ttf|svg|eot)$/, loader: 'file' }
    ]
  }
};
