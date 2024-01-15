module.exports = {
    plugins: {
        "postcss-pxtorem": {
            rootValue: 40,
            propList: ["*"],
            minPixelValue: 2,
            exclude: /src/
        }
    }
}
