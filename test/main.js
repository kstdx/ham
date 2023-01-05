import Ham from '../src/mod.js'

const plugin = (util) => {
    if (util === 'ham-first-plugin') {
        return {
            color: 'blue'
        }
    }
}

const style = new Ham()
style.use(plugin)

console.log(
    style.compile({
        div: {
            $apply: ['ham-first-plugin']
        }
    })
)
