const path = require('path');

module.exports = {
  entry: './src/index.js', // Your main entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader', // Use Babel for JavaScript files
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Use style and CSS loaders for .css files
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/', // Output directory for images
            },
          },
        ],
      },
    ],
  },
};
