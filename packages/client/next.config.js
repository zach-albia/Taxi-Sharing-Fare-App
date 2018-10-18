const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { ANALYZE } = process.env;
const withOffline = require("next-offline");
const withTypescript = require("@zeit/next-typescript");

module.exports = withTypescript(
  withOffline({
    publicRuntimeConfig: require("./app.config"),
    webpack: function(config, { isServer }) {
      config.resolve.symlinks = false;
      if (ANALYZE) {
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: "server",
            analyzerPort: isServer ? 8888 : 8889,
            openAnalyzer: true
          })
        );
      }
      return config;
    }
  })
);
