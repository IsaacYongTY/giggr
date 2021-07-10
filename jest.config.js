module.exports = {
  verbose: true,
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(ts|js)x?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "^lodash-es$": "lodash",
  },
  transformIgnorePatterns: [
  // Change MODULE_NAME_HERE to your module that isn't being compiled
  "/node_modules/react-tabs/style/react-tabs.css"
]
};