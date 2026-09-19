module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    // Required by react-native-reanimated v4: worklets must be transformed
    // last, so this stays at the end of the plugin list.
    plugins: ['react-native-worklets/plugin'],
  };
};
