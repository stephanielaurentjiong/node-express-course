const asyncWrapper = (fn) => { //parameter choose your own 

    //try to avoid try cath block repetition in tasks.js

    return async (req, res, next) => { //pass the req, res, next from express down to the "fn" function. The fn parameter is the argument for the controller in tasks.js wrapped in asyncWrapper
        try {
            await fn(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = asyncWrapper