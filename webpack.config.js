const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = (env) => ({
  entry: { mern_app: "./src/client/index.tsx" },
  output: {
    path: __dirname + "/dist/static/",
    filename: env.LOCAL ? "[name].js" : "[name][contenthash].js",
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
  devServer: {
    historyApiFallback: true,
    port: 3015,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: { configFile: "./tsconfig.client.json" },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: env && env.ANALYZE ? "server" : "disabled",
    }),
    new WebpackManifestPlugin(),
  ],
});
