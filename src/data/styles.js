// You could imagine this function coming from a shared/components package
// which would be shared between React/whatever projects
const buttonStyles = ({ variant }) => ({
    appearance: 'none',
    paddingY: 2,
    paddingX: 3,
    border: 'none',
    variant,
    __themeKey: 'buttons'
})

module.exports = {
    button(variant = 'default') {
        return JSON.stringify(buttonStyles({ variant }))
    }
}