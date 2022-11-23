module.exports = {
    preset: "jest-expo",
    transformIgnorePatterns: [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|react-native-responsive-fontsize|native-base|react-native-svg|expo-auth-session)",
      "/android",
      "/ios"
    ],
    "setupFiles": [
      "./jestSetupFile.js"
    ],
    setupFilesAfterEnv: [
      "@testing-library/jest-native/extend-expect",
      "jest-styled-components",
    ]
}