module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ['<rootDir>/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    moduleNameMapper: {
        '\\.(jpg|ico|jpeg|png|gif)$': '<rootDir>/mocks/fileMock.js',
        '\\.(css|less|scss)$': '<rootDir>/mocks/fileMock.js',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testEnvironment: 'jsdom',
}
