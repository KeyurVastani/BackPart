const router = require('express').Router();
const Book = require('../models/booking');



router.post('/booking', async (req, res) => {
    console.log("Req 1", req.body)

    if (!req.body.indate || !req.body.outdate)
        return res.status(400).send({ error: 'In and Out date Filed is Required' });




    // console.log(((new Date("2021-12-21")).getTime()));
    // console.log(new Date(time.getTime()))

    const reqInTime = ((new Date(req.body.indate)).getTime())
    const reqOutTime = ((new Date(req.body.outdate)).getTime())
    //  console.log(reqInTime <= reqOutTime)


    if (!(reqInTime <= reqOutTime)) {
        return res.status(400).send({ error: 'please select the bigger date then In date' });
    }


    // check input date 

    const dateInCheck = await Book.findOne({ indate: req.body.indate });
    if (dateInCheck) return res.status(400).send({ error: 'Indate is already Occupied please select new date' });


    //check Output date

    const dateOutCheck = await Book.findOne({ indate: req.body.outdate });
    if (dateOutCheck) return res.status(400).send({ error: 'Outdate is already Occupied please select new date' });


    //check date in millisecond
    //  console.log("=======1",await Book.findOne({ indatetime: { $lte: reqInTime }, outdatetime: { $gte: reqInTime  } }))

    if ((await Book.findOne({ indatetime: { $lte: reqInTime }, outdatetime: { $gte: reqInTime } })) !== null) {
        return res.status(400).send({ error: 'this In date sloat  is occupied' });
    }

    //  console.log("=======2",await Book.findOne({ indatetime: { $lte: reqInTime }, outdatetime: { $gte: reqInTime  } }))

    if (await Book.findOne({ indatetime: { $lte: reqOutTime }, outdatetime: { $gte: reqOutTime } }) !== null) {
        return res.status(400).send({ error: 'this out date is occupied' });
    }



    const booking = new Book({
        ...req.body,
        indatetime: reqInTime,
        outdatetime: reqOutTime


    });

    try {
        // await booking.save();
        const bookingDetail = await Book.findOne({ indate: booking.indate })
        res.status(200).send({ msg: 'This sloat is available', bookingDetail: bookingDetail });

    } catch (error) {
        res.status(400).send({ Msg: 'This sloat is not available!!!', error });
    }
})







router.get('/booking', async (req, res) => {
    try {
        const bookdate = await Book.find({})
        // console.log("========1",bookdate)
        res.status(200).send({ msg: 'book date', bookdate });


    } catch (error) {
        res.status(400).send({ Msg: 'This sloat is not available!!!', error });

    }

})


router.post('/finalBooking', async (req, res) => {


    console.log("========finalBooking", req.body)
    if (!req.body.indate || !req.body.outdate || !req.body.username || !req.body.useremail || !req.body.totalmember)
        return res.status(400).send({ error: ' Username and Email Filed is Required' });




    // console.log(((new Date("2021-12-21")).getTime()));
    // console.log(new Date(time.getTime()))

    const reqInTime = ((new Date(req.body.indate)).getTime())
    const reqOutTime = ((new Date(req.body.outdate)).getTime())
    //  console.log(reqInTime <= reqOutTime)


    if (!(reqInTime <= reqOutTime)) {
        return res.status(400).send({ error: 'please select the bigger date then In date' });
    }


    // check input date 

    const dateInCheck = await Book.findOne({ indate: req.body.indate });
    if (dateInCheck) return res.status(400).send({ error: 'Indate is already Occupied please select new date' });


    //check Output date

    const dateOutCheck = await Book.findOne({ indate: req.body.outdate });
    if (dateOutCheck) return res.status(400).send({ error: 'Outdate is already Occupied please select new date' });


    //  check date in millisecond
    //  console.log("=======1",await Book.findOne({ indatetime: { $lte: reqInTime }, outdatetime: { $gte: reqInTime  } }))

    if ((await Book.findOne({ indatetime: { $lte: reqInTime }, outdatetime: { $gte: reqInTime } })) !== null) {
        return res.status(400).send({ error: 'this In date sloat  is occupied' });
    }

    //  console.log("=======2",await Book.findOne({ indatetime: { $lte: reqInTime }, outdatetime: { $gte: reqInTime  } }))

    if (await Book.findOne({ indatetime: { $lte: reqOutTime }, outdatetime: { $gte: reqOutTime } }) !== null) {
        return res.status(400).send({ error: 'this out date is occupied' });
    }



    const booking = new Book({
        ...req.body,
        indatetime: reqInTime,
        outdatetime: reqOutTime


    });

    try {
        await booking.save();
        const bookingDetail = await Book.findOne({ indate: booking.indate })
        res.status(200).send({ msg: 'Villa is Booked', bookingDetail: bookingDetail });

    } catch (error) {
      
        res.status(400).send({ Msg: 'some problem is occur in Villa booking!!!', error });
    }  
})



router.post('/BookingFatch', async (req, res)=>{
    if (!req.body.useremail){
       return res.status(400).send({ error: 'Please enter the Email Address!!!' });
    }
// console.log("-------------",req.body.useremail)
    try{
        const bookdata = await Book.findOne({useremail:req.body.useremail})
        if (!bookdata) return res.status(400).send({ error: 'this email not contain any data' });
                //  console.log("-------------",bookdata)
        res.status(200).send({ msg: 'Booking Detail', bookdata });

    }catch(error){
        res.status(400).send({ error: 'some problem is occur in Villa booking!!!' });
    }

})








module.exports = router;