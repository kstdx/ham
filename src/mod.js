export default class {
    #plugins = []

    use = (plugin) => this.#plugins.push(plugin)

    compile = (object) => {
        const { cssList } = this.parse(object)

        let css = ''
        for (const cssItem of cssList) {
            let cssSelector = ''

            let isFirst = true
            for (const parent of cssItem.parents) {
                if (isFirst) {
                    isFirst = false
                    cssSelector += parent
                } else {
                    if (parent[0] === '$') {
                        cssSelector += ':' + parent.slice(1)
                    } else {
                        cssSelector += '>' + parent
                    }
                }
            }

            if (Array.isArray(cssItem.styles.$apply)) {
                for (const util of cssItem.styles.$apply) {
                    for (const plugin of this.#plugins) {
                        const result = plugin(util) ?? false

                        if (plugin !== false) {
                            for (const styleName in result) {
                                cssItem.styles[
                                    styleName
                                        .split('')
                                        .map((char) => {
                                            if (char.match(/[A-Z]/)) {
                                                return '-' + char.toLowerCase()
                                            }
                                            return char
                                        })
                                        .join('')
                                ] = result[styleName]
                            }
                        }
                    }
                }

                delete cssItem.styles.$apply
            }

            css += cssSelector + '{'
            for (const styleName in cssItem.styles) {
                css += styleName + ':' + cssItem.styles[styleName] + ';'
            }
            css += '}'
        }

        return css
    }

    parse = (object, cssList = [], parents = []) => {
        let style = {}
        for (const name in object) {
            if (
                typeof object[name] === 'string' ||
                typeof object[name] === 'number' ||
                Array.isArray(object[name])
            ) {
                const cssName = name
                    .split('')
                    .map((char) => {
                        if (char.match(/[A-Z]/)) {
                            return '-' + char.toLowerCase()
                        }
                        return char
                    })
                    .join('')
                style[cssName] = object[name]
            } else if (typeof object[name] === 'object') {
                let selfParents = Object.values(parents)
                selfParents.push(name)
                cssList.push({
                    parents: selfParents,
                    styles: this.parse(object[name], cssList, selfParents).style
                })
            } else {
                continue
            }
        }

        return { style, cssList }
    }
}
