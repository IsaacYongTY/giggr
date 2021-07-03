module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(ts|js)x?$": "ts-jest"
  },
  moduleNameMapper: {
    "\\.scss$": "identity-obj-proxy",
    "^lodash-es$": "lodash"
  },
};