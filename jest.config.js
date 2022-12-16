module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js'],
  coveragePathIgnorePatterns: ['cdk', 'src/shared/errors', 'src/config'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  verbose: true,
  testPathIgnorePatterns: ['cdk'],
};
