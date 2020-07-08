const baseTheme = require('@theme-ui/preset-base').default

module.exports = {
    ...baseTheme,
    layout: {
        header: {
            backgroundColor: ['red', 'primary'],
            padding: [2, 3],
            color: 'white'
        },
        footer: {
            backgroundColor: 'primary',
            padding: 3
        }
    }
}