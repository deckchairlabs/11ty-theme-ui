const htmlnano = require('htmlnano')

const preset = Object.assign(htmlnano.presets.max, {
    removeRedundantAttributes: true
})

module.exports = {
    htmlmin: async function (content, outputPath) {
        if (
            outputPath &&
            outputPath.endsWith('.html') &&
            process.env.ELEVENTY_ENV === 'production'
        ) {
            const { html } = await htmlnano.process(
                content,
                {
                    minifySvg: {
                        plugins: [{ removeViewBox: false }]
                    }
                },
                preset
            )

            return html
        }

        return content
    }
}