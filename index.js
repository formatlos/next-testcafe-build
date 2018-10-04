module.exports = (nextConfig = {}) => {
  if (!nextConfig.testcafeBuild) return nextConfig;

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade',
        );
      }
      const { dev } = options;
      if (!dev) {
        for (const plugin of config.plugins) {
          if (plugin['constructor']['name'] === 'UglifyJsPlugin') {
            const uglifyOptions = plugin.options.uglifyOptions;
            plugin.options.uglifyOptions = Object.assign({}, uglifyOptions, {
              compress: Object.assign({}, uglifyOptions.compress, {
                keep_fnames: true,
              }),
              mangle: Object.assign({}, uglifyOptions.mangle, {
                keep_fnames: true,
              }),
            });
            break;
          }
        }

        if (config.optimization && config.optimization.minimizer) {
          config.optimization.minimizer.forEach(plugin => {
            if (plugin.constructor.name === 'TerserPlugin') {
              plugin.options.terserOptions.keep_fnames = true;
              plugin.options.terserOptions.keep_classnames = true;
            }
          });
        }
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }
      return config;
    },
  });
};
