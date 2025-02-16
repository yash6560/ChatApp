const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

const userSignup = async(req, res) => {
    const {fullname, email, password} = req.body;
    try {
        const user = await User.findOne({email})
        if(user){
            return res.status(409).json({message : "user is already present"});
        }
        
        const hashPass = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            password : hashPass,
        })

        return res.status(200).json({message : "user is created", success : true})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "user is not register"})
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials", success: false });
        }

        const checkPass = await bcrypt.compare(password, user.password);
        if (!checkPass) {
            return res.status(401).json({ message: "Invalid credentials", success: false });
        }

        await generateToken(user._id, res);

        return res.status(200).json({ message: "Login successful", success: true, _id: user._id,
            fullName: user.fullname,
            email: user.email,
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "User login failed" });
    }
};

const userLogout = async (req, res) => {
    try {
        return res.clearCookie('token').status(200).json({success:true, message:"logout successful"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "User not logout" });
    }
}

const userProfile = async (req, res) => {
    try {
        userId = req.user._id;

        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const imageUrl = req.file.path;

        const user = await User.findByIdAndUpdate(userId, {image : imageUrl}, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            imageUrl: user.image,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "profile not set" });
    }
}

const checkAuth = async(req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "User not autorized" });
    }
}

module.exports = {userSignup, userLogin,userLogout, checkAuth, userProfile }