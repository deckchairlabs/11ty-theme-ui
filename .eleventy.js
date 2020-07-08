const themeUiPlugin = require('./eleventy/plugins/theme-ui.js')

module.exports = function (config) {
    // Plugins
    config.addPlugin(themeUiPlugin, {
        themePath: './theme'
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
