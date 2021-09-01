const router = require('express').Router();
const Book = require('../models/booking');




router.post('/booking', async (req, res) => {
    console.log("Req", req.body)

 
   

    // console.log(((new Date("2021-12-21")).getTime()));
    // console.log(new Date(time.getTime()))

     const reqInTime= ((new Date(req.body.indate)).getTime())
     const reqOutTime= ((new Date(req.body.outdate)).getTime())
     console.log(reqInTime <= reqOutTime)

       
     if(!(reqInTime <= reqOutTime)){
        return res.status(400).send({ error: 'please select the bigger date then In date' });
     }


    // check input date 
    if (!req.body.indate) {
        return res.status(400).send({ error: 'Check In date is Required' });
    } else {
        const dateInCheck = await Book.findOne({ indate: req.body.indate });
        if (dateInCheck) return res.status(400).send({ error: 'Indate is already Occupied please select new date' });
    }

    //check Output date
    if (!req.body.outdate) {
        return res.status(400).send({ error: 'Check Out date is Required' });
    } else {
        const dateOutCheck = await Book.findOne({ indate: req.body.outdate });
        if (dateOutCheck) return res.status(400).send({ error: 'Outdate is already Occupied please select new date' });
    }

     //check date in millisecond
     console.log("=======1",await Book.findOne({ indatetime: { $lte: reqInTime }, outdatetime: { $gte: reqInTime  } }))
     
     if( (await Book.findOne({ indatetime: { $lte: reqInTime }, outdatetime: { $gte: reqInTime  } }))!==null){
        return res.status(400).send({ error: 'this In date porsion is occupied' });
     }

     console.log("=======2",await Book.findOne({ indatetime: { $lte: reqInTime }, outdatetime: { $gte: reqInTime  } }))

     if(await Book.findOne({ indatetime: { $lte: reqOutTime }, outdatetime: { $gte: reqOutTime  } })!==null)
     {
        return res.status(400).send({ error: 'this out date is occupied' });
     }



    const booking = new Book({
        ...req.body,
        indatetime:reqInTime,
        outdatetime:reqOutTime

       
    });

    try {
        await booking.save();
        const bookingDetail = await Book.findOne({ indate: booking.indate })
        res.status(200).send({ msg: 'Registration Sucessfull', bookingDetail: bookingDetail });

    } catch (error) {
        res.status(400).send({ Msg: 'Registration Failed!!!', error });
    }
})

module.exports = router;