module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                modules: false,
                useBuiltIns: false
            }
        ]
    ],
    plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-jsx",
        "@babel/plugin-transform-runtime",
        "module:@vue/babel-plugin-transform-vue-jsx",
        "module:@vue/babel-sugar-functional-vue",
        "module:@vue/babel-sugar-inject-h",
        "module:@vue/babel-sugar-v-model",
        "module:@vue/babel-sugar-v-on"
    ]
}
