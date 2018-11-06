const TEST_REGEX = "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$";

module.exports = {
  cacheDirectory: ".jest-cache",
  roots: ["<rootDir>/src/"],
  testURL: "http://localhost",
  testRegex: TEST_REGEX,
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "babel-jest"
  },
  transformIgnorePatterns: ["node_modules/(?!(assert)/)"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  collectCoverage: true
};
