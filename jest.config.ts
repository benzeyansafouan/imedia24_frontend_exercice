

export default {
  cacheDirectory: 'C:\\Users\\hp\\AppData\\Local\\Temp\\jest',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  moduleDirectories: ['./node_modules', 'src'],
  moduleFileExtensions: [
    "js",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],
  moduleNameMapper: {
    "\\.(css|scss)$": 'identity-obj-proxy',
    '^[./a-zA-Z0-9$_-]+\\.svg$': '<rootDir>/svg-transformer.js'
  },
  modulePathIgnorePatterns: ['<rootDir>/packages/'],
  setupFiles: [
      "<rootDir>/setupTests.ts"
  ],
  setupFilesAfterEnv: [
      "@testing-library/react"
  ],
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/__tests__/**/*.test.tsx'
  ],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    '\\.svg$': '<rootDir>/svg-transformer.js',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!@react-native|react-native)',
    '\\.svg$'
  ],
  watchPathIgnorePatterns: ['<rootDir>/node_modules'],
  preset:'ts-jest',
};
