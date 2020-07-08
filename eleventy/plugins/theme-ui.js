const emotion = require('emotion')
const createEmotionServer = require('create-emotion-server').default
const { css: sx, get } = require('@theme-ui/css')

const defaultOptions = {
    theme: {}
}

module.exports = (eleventy, options = defaultOptions) => {
    const { theme } = options

    eleventy.addTransform('injectStyles', function (content, outputPath) {
        if (
            outputPath &&
            outputPath.endsWith('.html')
        ) {
            if (theme.useBodyStyles === true || (theme.styles && theme.styles.root)) {
                const boxSizing = theme.useBorderBox === false ? undefined : 'border-box'

                // Inject global styles
                emotion.injectGlobal(sx({
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

    eleventy.addFilter('sx', function (value, css = {}) {
        const { variant, __themeKey, ...baseStyles } = value
        const variantStyles = sx(get(theme, __themeKey + '.' + variant, get(theme, variant)))({ theme })

        const mergedStyles = {
            ...sx(baseStyles)({ theme }),
            ...variantStyles,
            ...css
        }

        return emotion.css(mergedStyles)
    })
}