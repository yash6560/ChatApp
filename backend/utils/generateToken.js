const jwt = require('jsonwebtoken');

const generateToken = async (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
        httpOnly: true,  // Prevents JavaScript access (secure)
        secure: true,    // Set to true in production (HTTPS only)
        sameSite: "None", // Required for cross-origin requests
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
    });

    return token; 
};

module.exports = generateToken;