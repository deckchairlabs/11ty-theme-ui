require('dotenv').config()

const {
    META_TITLE,
    META_URL,
    META_DESC,
    META_LANG,
    META_COLOR
} = process.env

module.exports = {
    title: META_TITLE || 'Lean',
    url: META_URL || '',
    description: META_DESC || 'Meta description.',
    lang: META_LANG || 'en',
    primaryColor: META_COLOR || '#000000'
}
