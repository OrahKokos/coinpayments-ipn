module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  collectCoverageFrom: ['src/**/*'],
  coveragePathIgnorePatterns: ['types.ts'],
  rootDir: './',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  coverageDirectory: 'coverage',
  collectCoverage: true,
  testEnvironment: 'node'
}
