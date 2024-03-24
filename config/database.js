const mongoose = require("mongoose")

const connectWithDb = () => { 
    mongoose
        .connect('mongodb://localhost:27017/otakuoasis', {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('DB GOT CONNECTED');
        })
        .catch((error) => {
            console.log('DB ISSUES');
            console.error(error); 
            process.exit(1);
        });
};

module.exports = connectWithDb;