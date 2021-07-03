module.exports = {
  verbose: true,
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(ts|js)x?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.scss$": "identity-obj-proxy",
    "^lodash-es$": "lodash"
  },
};