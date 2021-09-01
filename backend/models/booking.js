const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    indate: {
        type: String,
        required: true,     
    },

    outdate: {
        type: String,
        required: true,      
    },
    indatetime:{
        type: Number,

    },
    outdatetime:{
        type: Number,

    },

    child:{
        type: String,   
    },
    adult:{
        type: String, 
    },
    createdby:{
        type:String
    }
});

const Book = mongoose.model('Booking', bookingSchema);

module.exports = Book;