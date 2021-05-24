const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

function tokenBuilder(user) {
    const payload = {
        sub: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secret, options)
}

module.exports = tokenBuilder