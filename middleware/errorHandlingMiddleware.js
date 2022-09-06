const apiError = require('../error/apiError');


module.exports = (error, req, response, next) => {
    if (error instanceof apiError) {
        response.status(error.status).json({message: error.message})
    }

    return response.status(500).json({message: 'Unexpected error!'})
}