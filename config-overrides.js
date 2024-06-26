const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

// module.exports = override(
//   addWebpackAlias({
//     '@': path.resolve(__dirname, 'src'),
//   }),
// );

module.exports = {
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);
      // Change the dev server's config here...
      config.client = {
        overlay: false,
      };
      // Then return your modified config.
      return config;
    };
  },
};
