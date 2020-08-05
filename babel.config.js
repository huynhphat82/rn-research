module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@app/configs': './src/configs',
          '@app/components': './src/components',
          '@app/modules': './src/modules',
          '@app/middlewares': './src/middlewares',
          '@app/services': './src/services',
          '@app/stores': './src/stores',
          '@app/shared': './src/modules/shared',
        },
      },
    ],
  ],
};
