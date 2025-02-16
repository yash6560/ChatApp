const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authorizedCheck = async(req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({success: false, message:"Login again"}); 
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decode.userId).select('-password');
        if(!user) { 
            return res.status(401).json({message : "user is not found", success: false});
        }
        
        req.user = user;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:"Invalid Authentication"}); 
    }
}

module.exports = authorizedCheck;