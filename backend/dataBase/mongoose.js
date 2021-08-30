const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://keyur:keyur123@cluster0.rh3wt.mongodb.net/Air_Bnb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected");
}).catch((error) => {
    console.log("error", error);
    console.log('disconnect');
})

