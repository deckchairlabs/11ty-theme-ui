# 11ty-theme-ui (experimental)

Experiment integrating [ThemeUI](https://theme-ui.com/) with [11ty](https://www.11ty.dev/). This is very much a WIP, would love to have feature parity with ThemeUI eventually.

## TODO

- [Color modes](https://theme-ui.com/color-modes)
- Regular Markdown support, would work same way as [MDX](https://theme-ui.com/styling-mdx)
- Custom properties?
- Update to match new upcoming ThemeUI API changes

## Features

- Awesome DX of CSS-in-JS, but without the JavaScript runtime
- Automatic and pain free "critical" CSS
- CSS is minified and optimised via cssnano for smallest payload size possible

SX HTML attributes

```html
<div sx="{ display: 'flex', flexDirection: 'row' }">
  <div>Column</div>
  <div>Column</div>
</div>
---
<div class="css-wrrfgf">
  <div>Column</div>
  <div>Column</div>
</div>
```

Variants as regular HTML attributes

```html
<button variant="buttons.primary">Button</button>
---
<button class="css-s92abg">Button</button>
```

"Components" as shortcodes

```njk
{% button variant="primary" %}
  Button
{% endbutton %}
---
<button class="css-s92abg">Button</button>
```
