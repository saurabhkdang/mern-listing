const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, {
    collection: "items"
});

module.exports = mongoose.model('Item', itemSchema);