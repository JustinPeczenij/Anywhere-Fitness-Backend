const Users = require('../users/users-model')

const checkCredentialsLogin = async (req, res, next) => {
    try {
        if(!req.body.username || !req.body.password){
            next({ status: 422, message: 'username and password are required' })
        } 
        if(typeof req.body.password !== 'string'){
            next({ status: 422, message: 'password must be a string' })
        }
        const user = await Users.findByUsername(req.body.username)
        if(!user) next({status: 404, message: 'invalid credentials'})
        else next()
    } catch(err) {
        next(err)
    }
}

const checkCredentialsRegister = (req, res, next) => { //look at this after login
    if(!req.body.username || !req.body.password || !req.body.email){
        next({ status: 422, message: 'username, email, and password are required' })
    } else next()
}

const convertRoles = (req, res, next) => {
    if(!req.body.role && !req.body.role_id) {
        next({ status: 422, message: "user's role is required" })
    } else{
        if(req.body.role.toLowerCase() === 'instructor' || req.body.role_id === 1 || req.body.role === 1){
            req.body = {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                role_id: 1,
            }
            next()
        } else if(req.body.role.toLowerCase() === 'client' || req.body.role_id === 2 || req.body.role === 2){
            req.body = {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                role_id: 2,
            }
            next()
        } else {
            next({ status: 422, message: "role must be 'INSTRUCTOR', '1', or 'CLIENT', '2'" })
        }
    }
    
}

module.exports = {
    checkCredentialsLogin,
    checkCredentialsRegister,
    convertRoles
}