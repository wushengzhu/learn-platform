module.exports = {
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    plugins: ["react-refresh"],
    rules: {
        "react-refresh/only-export-components": "off",
        "react-hooks/rules-of-hooks": "off",
        "react-hooks/exhaustive-deps": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-types": "off",
        "react/jsx-no-useless-fragment": "off",
    },
    settings: {
        react: {
            version: "detect",
        },
        "import/resolver": {
            alias: {
                map: [["@", "./src"]],
                extensions: [".ts", ".tsx"],
            },
        },
    },
};
