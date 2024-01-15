const path = require("path");
const resolve = dir => path.join(__dirname, dir);

module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    pages: {
        index: {
            entry: "tests/main.ts",
            template: "public/index.html",
            filename: "index.html"
        }
    },
    css: {
        extract: false
    },
    configureWebpack: {
        output: {
            libraryExport: "default"
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("#", resolve("tests"))
            .set("components", resolve("src/components"))
            .set("styles", resolve("src/styles"));

        config.module.rule("less").oneOfs.store.forEach(item => {
            item.use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    resources: [
                        resolve("src/styles/control.module.less")
                    ]
                })
                .end()
        });

        config.optimization.minimizer("terser").tap(args => {
            const compress = args[0].terserOptions.compress;
            compress.drop_console = true;
            compress.pure_funcs = [
                "__f__"
            ];
            return args;
        });

        config.resolve.modules.prepend(resolve("node_modules"));
    }
}
