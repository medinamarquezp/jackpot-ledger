const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>"],
    modulePaths: ["<rootDir>"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.ts?$",
};
