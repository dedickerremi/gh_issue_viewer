module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/__tests__/setupTests.ts'],
  unmockedModulePathPatterns: ['react', 'enzyme', 'jest-enzyme'],
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/', '/setupTests.ts'], //'/svgTransform.js'],
  coveragePathIgnorePatterns: ['/node_modules/'], //ß, '/assetsTransformer.js'],
  transform: {
    "^.+\\.(js|tsx)?$": "babel-jest",
    ".+\\.scss$": "jest-css-modules-transform"
    // "^.+\\.svg$": "<rootDir>/__tests__/svgTransform.js",
  }
};
