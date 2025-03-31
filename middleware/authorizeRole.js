
const authorizeRole = (...roles) =>{
  return (req, res, next)=> {
      if(!req.user && roles.includes(req.user.role )){
        next()
       } return res.status(403).json({messaage: 'Forbidden - access restricted'})
      }
} 
module.exports = authorizeRole