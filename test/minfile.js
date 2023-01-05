import Ham from '../dist/ham.min.js'

const style = new Ham()

console.log(
    style.compile({
        p: {
            color: 'black'
        }
    })
)
