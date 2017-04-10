import webpack from 'webpack';

export default {
  entry: './src/public/js/react',
  output: { path: './src/public/js/react/build', filename: 'bundle.js' },
  module: {
    loaders: [{
      test: /.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
};
