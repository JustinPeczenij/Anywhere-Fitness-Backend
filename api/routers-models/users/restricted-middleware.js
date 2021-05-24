const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if(token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if(err) next({ status: 401, message: 'token invalid' }) 
      else {
        req.decodedJwt = decoded // 1- the decoded information from the token
        next() 
      }  
    })
  } else {
    next({ status: 401, message: 'token is required' })
  }
};
