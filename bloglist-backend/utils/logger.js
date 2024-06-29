const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params)
    } else {
        return
    }
}

const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(...params)
    } else {
        return
    }
}

module.exports = {
    info, error
}