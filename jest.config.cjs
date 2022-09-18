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
  moduleNameMapper: {
    "^@lib(.*)$": "<rootDir>/projects/mia-lib/src/lib/$1",
    "^@env(.*)$": "<rootDir>/src/environments/$1",
    "^@auth(.*)$": "<rootDir>/src/app/auth/$1",
    "^@home(.*)$": "<rootDir>/src/app/home/$1",
  },
  moduleDirectories: ["node_modules", "src", "projects/mia-lib"],
};
