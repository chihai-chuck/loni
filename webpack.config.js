/* 此文件仅用于IDE配置识别项目别名，对webpack不会有任何影响，webpack的相关配置需要在vue.config.js中修改 */

const path = require('path');

function resolve (dir) {
    return path.join(__dirname, '.', dir);
}

module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            '#': resolve('tests'),
            'components': resolve('src/components'),
            'styles': resolve('src/styles')
        }
    }
}
