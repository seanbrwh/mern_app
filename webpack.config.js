const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = (env) => ({
  entry: { mern_app: "./src/client/index.tsx" },
  output: {
    path: __dirname + "/dist/static",
    filename: env.LOCAL === "true" ? "[name].js" : "[name].[hash].js",
    publicPath: env.LOCAL === "true" ? env.PUBLIC_PATH : "/dist/static/",
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
          name:
            env.LOCAL === "true" ? "[path][name].[ext]" : "[contenthash].[ext]",
          publicPath:
            env.LOCACL === "true" ? env.PUBLIC_PATH : "/dist/static/assets/",
        },
      },
    ],
  },
  devtool: "source-map",
  target: ["web"],
  devServer: {
    proxy: { "/api": { target: "http://localhost:4000", secure: false } },
    historyApiFallback: true,
    port: 3015,
    hot: true,
    host: "0.0.0.0",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ["**/*", "!manifest.json"],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: { configFile: "./tsconfig.server.json" },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: env && env.ANALYZE === true ? "server" : "disabled",
    }),
    new WebpackManifestPlugin(),
  ],
});
