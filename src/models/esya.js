const mongoose = require("mongoose");

const esyaSchema = new mongoose.Schema({
    item: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    lowPrice: {
        type: Number,
        required: true
    },
    highPrice: {
        type: Number,
        required: true
    },
    bought: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true });

const Esya = mongoose.model("Esya", esyaSchema);
module.exports = Esya