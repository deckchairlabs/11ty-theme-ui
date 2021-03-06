const emotion = require('emotion')
const JSON5 = require('json5')
const createEmotionServer = require('create-emotion-server').default
const { css: cssx, get } = require('@theme-ui/css')
const { JSDOM } = require('jsdom')

const defaultOptions = {
    themePath: {}
}

const SX_ATTRIBUTE = 'sx'
const CSS_ATTRIBUTE = 'css'
const VARIANT_ATTRIBUTE = 'variant'

module.exports = (eleventyConfig, options = defaultOptions) => {
    const { themePath } = options

    let theme = require(require.resolve(themePath, {
        paths: [process.cwd()]
    }))

    function applyStyles(value, css = {}) {
        const { variant, __themeKey, ...baseStyles } = value
        const variantStyles = cssx(get(theme, __themeKey + '.' + variant, get(theme, variant)))({ theme })

        const mergedStyles = {
            ...variantStyles,
            ...cssx(baseStyles)({ theme }),
            ...css
        }

        return emotion.css(mergedStyles)
    }

    eleventyConfig.addTransform('theme-ui', function (content, outputPath) {
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

            let dom = new JSDOM(content)
            const elements = dom.window.document.querySelectorAll('[sx], [variant]')

            elements.forEach(element => {
                const sxAttribute = element.getAttribute(SX_ATTRIBUTE)
                const cssAttribute = element.getAttribute(CSS_ATTRIBUTE)
                const variantAttribute = element.getAttribute(VARIANT_ATTRIBUTE)

                const sxValue = sxAttribute ? JSON5.parse(sxAttribute.valueOf()) : {}
                const cssValue = cssAttribute ? JSON5.parse(cssAttribute.valueOf()) : {}
                const variantValue = variantAttribute ? variantAttribute.valueOf() : undefined

                element.removeAttribute(SX_ATTRIBUTE)
                element.removeAttribute(CSS_ATTRIBUTE)
                element.removeAttribute(VARIANT_ATTRIBUTE)

                element.className = applyStyles({
                    variant: variantValue,
                    ...sxValue
                }, cssValue)
            })

            const emotionServer = createEmotionServer(emotion.cache)
            const { html, css } = emotionServer.extractCritical(dom.serialize())

            dom = new JSDOM(html)
            const styleTag = dom.window.document.createElement('style')
            styleTag.innerHTML = css

            dom.window.document.head.append(styleTag)

            return dom.serialize()
        }

        return content
    })
}