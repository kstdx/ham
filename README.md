# Ham

The simplest CSS-in-JS library all in the world

# What is this?

This library can be used to convert JavaScript objects to CSS strings. (Nesting is also possible, of course.) You can also add new CSS utilities by creating your own plug-ins.

# Usage

## Install with CDN

By `https://cdn.jsdelivr.net/gh/kstdx/ham/dist/ham.min.js`

## Compile the JavaScript Object to CSS String

```js
import Ham from '[ham-cdn-url]'

const style = new Ham()
style.compile({
    /* Your CSS-in-JS */
})
```

## Build and Use plugins

```js
import Ham from '[ham-cdn-url]'

const plugin = (util) => {
    if (util === 'ham-first-plugin') {
        return {
            color: 'blue'
        }
    }
}

const style = new Ham()
style.use(plugin)

style.compile({
    div: {
        $apply: ['ham-first-plugin']
    }
})
// div{color:blue;}
```

# Examples

## Nesting

```js
{
    '.foo': {
        '.bar': {
            p: {
                backgroundColor: 'red',
                color: 'white'
            }
        }
    }
}
```

## Plugin

```js
style.use((util) => {
    if (util.slice(0, 6) === 'color-') {
        return {
            color: util.slice(6)
        }
    }
})

style.compile({
    p: {
        $apply: ['color-red']
    }
})
```

# License

This repository is under MIT License.

# More

I am a junior high school student who loves Japanese web production. Your reactions motivate me, so I would be very happy if you star, follow, or sponsor me.
