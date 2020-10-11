const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).catch(error => console.log(error));
//https://mongoosejs.com/docs/schematypes.html for all schema types
