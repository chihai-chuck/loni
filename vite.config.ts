import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx';
import postcssPxtorem from "postcss-pxtorem";

export default defineConfig({
    plugins: [
        vue(),
        vueJsx({
            babelPlugins: [
                [
                    "@babel/plugin-proposal-decorators",
                    {
                        legacy: true
                    }
                ]
            ]
        })
    ],
    css: {
        preprocessorOptions: {
            less: {
                additionalData: `@import "@/styles/control.module.less";`
            }
        },
        postcss: {
            plugins: [
                postcssPxtorem({
                    rootValue: 40,
                    propList: ["*"],
                    minPixelValue: 2,
                    exclude: /src/
                })
            ]
        }
    },
    build: {
        outDir: path.resolve(__dirname, "./lib"),
        lib: {
            entry: path.resolve(__dirname, "src/main.ts"),
            name: "Loni",
            fileName: "loni"
        },
        rollupOptions: {
            external: ["vue"],
            output: [
                {
                    format: 'umd',
                    exports: 'named',
                    sourcemap: false,
                    entryFileNames: 'loni.cjs',
                    chunkFileNames: '[name].js',
                    assetFileNames: '[name].[ext]',
                    inlineDynamicImports: false,
                    manualChunks: undefined,
                    globals: { vue: 'Vue' }
                },
                {
                    format: 'es',
                    exports: 'named',
                    sourcemap: false,
                    entryFileNames: 'loni.mjs',
                    chunkFileNames: '[name].js',
                    assetFileNames: '[name].[ext]',
                    inlineDynamicImports: false,
                    manualChunks: undefined,
                    globals: { vue: 'Vue' }
                }
            ]
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "#": path.resolve(__dirname, "tests"),
            "components": path.resolve(__dirname, "src/components"),
            "styles": path.resolve(__dirname, "src/styles")
        }
    }
});
