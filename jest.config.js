module.exports = {
    preset: "jest-expo",
    transformIgnorePatterns: [
      "/node_modules",
      "/android",
      "/ios"
    ],
    setupFilesAfterEnv: [
      "@testing-library/jest-native/extend-expect"
    ]
}