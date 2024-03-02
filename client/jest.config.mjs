/*
code provided by ChatGPT4 via chat.openai.com

Prompt(s): requested help eliminating errors after installing Jest
*/
export default {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js'
    },
    transform: {
        "^.+\\.m?js$": "babel-jest"
    }
}
