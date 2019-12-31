const path = require('path');

module.exports = {
    mode: "development",
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve:{
        alias:{
            'vue-next$':'vue-next/packages/vue/dist/vue.esm-browser.js'
        }
    }
};