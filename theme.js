const baseTheme = require('@theme-ui/preset-base').default

module.exports = {
    ...baseTheme,
    layout: {
        header: {
            backgroundColor: ['red', 'blue'],
            padding: [2, 3]
        }
    }
}