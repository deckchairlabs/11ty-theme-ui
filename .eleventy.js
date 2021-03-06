const themeUiPlugin = require('./eleventy/plugins/theme-ui.js')
const transforms = require('./eleventy/transforms.js')
const shortcodes = require('./eleventy/shortcodes.js')

module.exports = function (config) {
    // Plugins
    config.addPlugin(themeUiPlugin, {
        themePath: './theme'
    })

    // Shortcodes
    Object.keys(shortcodes).forEach((shortcodeName) => {
        config.addPairedShortcode(shortcodeName, shortcodes[shortcodeName])
    })

    // Transform
    Object.keys(transforms).forEach((transformName) => {
        config.addTransform(transformName, transforms[transformName])
    })

    config.addWatchTarget('./theme');

    // Layouts
    config.addLayoutAlias('base', 'base.njk')

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
        templateFormats: ['njk'],
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        passthroughFileCopy: true
    }
}
