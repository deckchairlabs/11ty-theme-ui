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
    },
    buttons: {
        default: {
            appearance: 'none',
            paddingY: 2,
            paddingX: 3,
            border: 'none',
        },
        primary: {
            appearance: 'none',
            paddingY: 2,
            paddingX: 3,
            border: 'none',
            backgroundColor: 'primary',
            color: 'white'
        }
    }
}