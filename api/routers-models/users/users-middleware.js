const Users = require('./users-model')

const checkUserId = async (req, res, next) => {
    const user = await Users.findById(req.params.id)
    if(!user) {
        next({ status: 404, message: `user with id ${req.params.id} can not be found`})
    } else {
        req.user = user
        next()
    } 
}

module.exports = {
    checkUserId
}