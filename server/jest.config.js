/*
code provided by ChatGPT4 via chat.openai.com

Prompt(s): requested help configuring Jest for .mjs files
*/

module.exports = {

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",

    // use Babel to transform test files
    transform: { '^.+\\.m?js$': 'babel-jest' },

    // The test environment that will be used for testing
    testEnvironment: "node",

    // The glob patterns Jest uses to detect test files
    testMatch: [
        "**/tests/**/*.js",
        "**/tests/**/*.mjs",
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ],

    // Indicates whether each individual test should be reported during the run
    verbose: true,

    // Additional setup for tests, if you have global setup (e.g., setting up a database connection)
    // globalSetup: './path/to/globalSetup.js',
    // globalTeardown: './path/to/globalTeardown.js',
};
