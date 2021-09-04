const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = (env) => ({
  entry: { mern_app: "./src/client/index.tsx" },
  output: {
    path: __dirname + "/dist/static",
    filename: env.LOCAL ? "[name].js" : "[name].[hash].js",
    publicPath: env.PUBLIC_PATH || "/dist/static/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: env.LOCAL ? "[path][name].[ext]" : "[contenthash].[ext]",
          publicPath: env.PUBLIC_PATH || "/dist/static/assets/",
        },
      },
    ],
  },
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    port: 3015,
    host: "0.0.0.0",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: { configFile: "./tsconfig.server.json" },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: env && env.ANALYZE ? "server" : "disabled",
    }),
    new WebpackManifestPlugin(),
  ],
});
