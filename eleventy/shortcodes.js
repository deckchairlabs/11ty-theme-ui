const JSON5 = require('json5')

module.exports = {
    button: function (children, props = {}) {
        const { variant = 'primary', sx = {} } = props
        return `<button variant="buttons.${variant}" sx="${JSON5.stringify(sx)}">${children}</button>`
    },
    heading: function (children, props = {}) {
        const { variant = 'text.heading', as = 'h2', sx = {} } = props
        return `<${as} variant="${variant}">${children}</${as}>`
    }
}