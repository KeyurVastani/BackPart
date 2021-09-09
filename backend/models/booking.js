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
    createdby:{
        type:String
    },
    username:{
        type: String,
      
    },
    useremail:{
        type: String,
    },
    number:{
        type:String
    },
    totalmember:{
        type:Number,
    },
    totalamount:{
        type:Number,
    },
    totaldays:{
        type:Number,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
});

const Book = mongoose.model('Booking', bookingSchema);

module.exports = Book;