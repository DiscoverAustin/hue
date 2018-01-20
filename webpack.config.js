var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  context: SRC_DIR,
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    loaders : [
      {
        loader : 'babel-loader',
        test : /\.jsx?/,
        include : SRC_DIR
      },{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader']
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader']
      }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'file-loader',
      include : [ SRC_DIR, DIST_DIR ]
      // include: [ DIST_DIR
    }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
};
