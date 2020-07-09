# 11ty-theme-ui
Experiment integrating ThemeUI with 11ty. This is very much a WIP, would love to have feature parity with ThemeUI eventually.

## TODO
- Color modes
- Custom properties?
- Update to match new ThemeUI API

## Features

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
```
