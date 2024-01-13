module.exports = function (api) {
  api.cache(true);
  const plugins = [
    // [
    //   'module:react-native-dotenv',
    //   {
    //     envName: 'APP_ENV',
    //     moduleName: '@env',
    //     path: '.env',
    //   },
    // ],
  ];

  plugins.push([
    '@tamagui/babel-plugin',
    {
      components: ['tamagui'],
      config: './tamagui.config.ts',
    },
  ]);

  plugins.push('expo-router/babel');

  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
