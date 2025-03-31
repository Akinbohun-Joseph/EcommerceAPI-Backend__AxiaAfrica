const jwt = require('jsonwebtoken')

const tokengenerated = (id)=> {
    return jwt.sign({id}), process.envJWT_SECRET, {expireIn:' 30m'}
}
module.exports = tokengenerated;