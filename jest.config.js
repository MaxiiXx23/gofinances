module.exports = {
    preset: "jest-expo",
    transformIgnorePatterns: [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|react-native-responsive-fontsize|native-base|react-native-svg|expo-auth-session)/(?!victory-native)/",
      "node_modules/(?!victory-native)/",
      "/android",
      "/ios"
    ],
    "setupFiles": [
      "./jestSetupFile.js"
    ],
    setupFilesAfterEnv: [
      "@testing-library/jest-native/extend-expect",
      "jest-styled-components",
    ],
    collectCoverage: true,
    collectCoverageFrom:[
      "src/**/*.tsx",
      "!src/__tests__/*.spec.tsx"
    ],
    coverageReporters: [
      "lcov"
    ]
}