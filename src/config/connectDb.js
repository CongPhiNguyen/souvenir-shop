const mongoose = require('mongoose');

const USER_NAME = "dbCouvenir";
const PASSWORD = "5_TEPCDQu9d!eZS";
const URI = `mongodb+srv://dbCouvenir:${PASSWORD}@cluster0.gq6lw.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-t1atle-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`

module.exports = connectDB = async() => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connecting to DB successfully!");
    }
    catch(error) {
        console.error(error);
    }   
};