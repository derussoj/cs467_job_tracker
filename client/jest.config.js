/*
code provided by ChatGPT4 via chat.openai.com

Prompt(s): requested help eliminating errors after installing Jest
*/
module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js'
    }
};
