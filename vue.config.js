const fs = require('fs')
let envConfig = require('dotenv').parse(fs.readFileSync('.env'))
for (const k in envConfig) {
    process.env[k] = envConfig[k]
}

module.exports = {
    // publicPath: process.env.VUE_APP_BASE_URL,
//     pages: {
//         index: {
//             // entry for the page
//             entry: 'src/main.js',
//             // the source template
//             template: 'public/index.html',
//             // output as dist/index.html
//             filename: 'index.html',
//             // when using title option,
//             // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
//             title: 'Index Page',
//             // chunks to include on this page, by default includes
//             // extracted common chunks and vendor chunks.
//             chunks: ['chunk-vendors', 'chunk-common', 'index'],
//             historyApiFallback: true
//         },
//
//         // when using the entry-only string format,
//         // template is inferred to be `public/subpage.html`
//         // and falls back to `public/index.html` if not found.
//         // Output filename is inferred to be `subpage.html`.
//         // subpage: 'src/main.js'
//     }
}
