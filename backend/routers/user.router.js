const express = require('express');
const {userSignup, userLogin, userLogout, checkAuth, userProfile} = require('../controlers/user.controler');
const authorizedCheck = require('../middleware/authorizedCheck');
const upload = require("../middleware/multer");

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/logout', userLogout);
router.post('/check', authorizedCheck, checkAuth);
router.post('/profile', authorizedCheck,upload.single("image"), userProfile);

module.exports = router;