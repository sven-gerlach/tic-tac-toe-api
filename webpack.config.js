const TerserPlugin = require('terser-webpack-plugin');

module.exports = (options, webpack) => {
  return {
    ...options,
    entry: './src/serverless.ts',
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true,
          },
        }),
      ],
    },
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
  };
};
