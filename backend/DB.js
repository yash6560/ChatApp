const mongoose = require('mongoose');

const DBconnect = () =>{
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("database is connect");
    })
}

module.exports = DBconnect;