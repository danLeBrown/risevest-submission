/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.e2e-spec.ts'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  // testTimeout: 30000,
};
