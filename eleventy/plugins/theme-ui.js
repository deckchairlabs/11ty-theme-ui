const path = require('path')
const emotion = require('emotion')
const createEmotionServer = require('create-emotion-server').default
const { css: cssx, get } = require('@theme-ui/css')

const defaultOptions = {
    themePath: {}
}

module.exports = (eleventyConfig, options = defaultOptions) => {
    const { themePath } = options

    let theme = require(require.resolve(themePath, {
        paths: [process.cwd()]
    }))

    eleventyConfig.addTransform('injectStyles', function (content, outputPath) {
        if (outputPath && outputPath.endsWith('.html')) {
            // Check if we should inject root/global styles
            if (theme.useBodyStyles === true || (theme.styles && theme.styles.root)) {
                const boxSizing = theme.useBorderBox === false ? undefined : 'border-box'
                // Inject global styles
                emotion.injectGlobal(cssx({
                    '*': {
                        boxSizing,
                    },
                    body: {
                        margin: 0,
                        variant: 'styles.root',
                    }
                })({ theme }))
            }

            const emotionServer = createEmotionServer(emotion.cache)
            return emotionServer.renderStylesToString(content)
        }

        return content
    })

    eleventyConfig.addFilter('sx', function (value, css = {}) {
        const { variant, __themeKey, ...baseStyles } = value
        const variantStyles = cssx(get(theme, __themeKey + '.' + variant, get(theme, variant)))({ theme })

        const mergedStyles = {
            ...variantStyles,
            ...cssx(baseStyles)({ theme }),
            ...css
        }

        return emotion.css(mergedStyles)
    })
}