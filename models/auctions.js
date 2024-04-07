const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auctionSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    item: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
