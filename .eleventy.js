const pluginPWA = require('eleventy-plugin-pwa')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')

const themeUiPlugin = require('./eleventy/plugins/theme-ui.js')
const filters = require('./eleventy/filters.js')
const transforms = require('./eleventy/transforms.js')
const theme = require('./theme')

const workboxOptions = {
    cacheId: 'lean',
    swDest: './dist/sw.js',
    globPatterns: ['**/*.html', 'static/scripts/offline.js'],
    globIgnores: ['404/**/*'],
    importScripts: ['/static/scripts/worker.js'],
    skipWaiting: false
}

require('dotenv').config()

module.exports = function (config) {
    // Plugins
    config.addPlugin(pluginPWA, workboxOptions)
    config.addPlugin(themeUiPlugin, {
        theme
    })

    // Filters
    Object.keys(filters).forEach((filterName) => {
        config.addFilter(filterName, filters[filterName])
    })

    // Transform
    Object.keys(transforms).forEach((transformName) => {
        config.addTransform(transformName, transforms[transformName])
    })

    // Markdown
    const mdlib = markdownIt({
        html: true,
        breaks: true,
        linkify: true,
        typographer: true
    }).use(markdownItAnchor, {
        permalink: true,
        permalinkClass: 'anchor',
        permalinkSymbol: '#'
    })
    config.setLibrary('md', mdlib)

    // Layouts
    config.addLayoutAlias('base', 'base.njk')

    // Pass-through files
    config.addPassthroughCopy('src/static')
    config.addPassthroughCopy('src/robots.txt')

    // Deep-Merge
    config.setDataDeepMerge(true)

    // Base Config
    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: 'includes',
            layouts: 'layouts',
            data: 'data'
        },
        templateFormats: ['njk', 'md'],
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        passthroughFileCopy: true
    }
}
