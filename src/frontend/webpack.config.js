const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const cssLoader = {
  loader: "css-loader",
  options: {
    modules: true,
    // https://github.com/webpack-contrib/css-loader#importloaders
    importLoaders: 2
  }
};

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      require('autoprefixer')()
    ]
  }
};

module.exports = function(env) {
  const production = env === 'production' || process.env.NODE_ENV === 'production';
  return {
    mode: production ? 'production' : 'development',
    devtool: production ? 'source-maps' : 'inline-source-map',
    entry: './src/main.ts',
    output: {
      path: path.resolve(__dirname, '..', '..', 'docs'),
      // path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js'
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    devServer: {
      historyApiFallback: true,
      open: !process.env.CI,
      port: 9000,
      lazy: false
    },
    module: {
      rules: [
        { test: /\.scss$/i, use: [ "style-loader", cssLoader, postcssLoader, { loader: "sass-loader", options: { sassOptions: { includePaths: ["node_modules"] } } } ] },
        { test: /\.ts$/i, use: ['ts-loader', '@aurelia/webpack-loader'], exclude: /node_modules/ },
        {
          test: /\.html$/i,
          use: {
            loader: '@aurelia/webpack-loader',
            options: { useCSSModule: true }
          },
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'index.ejs' }),
      new CopyPlugin([
        // { from: 'src/assets', to: 'assets' },
        { from: 'src/assets', to: path.resolve(__dirname, '..', '..', 'docs', 'assets') },
      ])
    ]
  }
}
