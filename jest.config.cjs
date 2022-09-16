module.exports = {
  collectCoverage: true,
  preset: "jest-preset-angular",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.(html|svg)$",
    },
  },
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  transform: {
    "^.+\\.(ts|js|mjs|html|svg)$": "jest-preset-angular",
  },
  resolver: "<rootDir>/jest.resolver.cjs",
  moduleFileExtensions: ["ts", "tsx", "js"],
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
  moduleNameMapper: {
    "^@lib(.*)$": "<rootDir>/projects/mia-lib/src/lib/$1",
    "^@env(.*)$": "<rootDir>/src/environments/$1",
    "^@auth(.*)$": "<rootDir>/src/app/auth/$1",
    "^@home(.*)$": "<rootDir>/src/app/home/$1",
    "^(.*)\\.js$": "$1",
  },
};
