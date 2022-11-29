module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "nativewind/babel",
      ['module-resolver', {
        root: ['./src'],
        alias: {
          '@api': '../api',
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@shared': './src/shared'
        }
      }]
    ],
  };
};
