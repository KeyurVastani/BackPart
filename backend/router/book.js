const router = require('express').Router();
const Book = require('../models/booking');
const validate = require('../validation/validation');
const verify = require('../auth/verifyLogin')
const { google } = require('googleapis');
require('dotenv').config();
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: "v3" });


const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);
const TIMEOFFSET = '+05:30';


router.post('/booking', async (req, res) => {
    console.log("Req 1", req.body)

    if (!req.body.indate || !req.body.outdate)
        return res.status(400).send({ error: 'In and Out date Filed is Required' });



    const reqInTime = ((new Date(req.body.indate)).getTime())
    const reqOutTime = ((new Date(req.body.outdate)).getTime())



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

    if (!req.body.indate || !req.body.outdate || !req.body.username || !req.body.useremail || !req.body.totalmember || !req.body.number)
        return res.status(400).send({ error: ' Username, Email and Mobile number  Filed is Required' });


    if (!validate.emailCheck(req.body.useremail)) return res.status(400).send({ error: 'Enter Correct Email Address!!!' });

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




    console.log("=====", `${req.body.indate}`);
    // Get date-time string for calender
    const dateTimeForCalander = () => {

        let date = new Date(`${req.body.indate}`);

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`;
        }
        let day = date.getDate();
        if (day < 10) {
            day = `0${day}`;
        }
        let hour = date.getHours();
        if (hour < 10) {
            hour = `0${hour}`;
        }
        let minute = date.getMinutes();
        if (minute < 10) {
            minute = `0${minute}`;
        }

        let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;
        console.log(newDateTime);

        let event = new Date(Date.parse(newDateTime));

        let startDate = event;
        // Delay in end time is 1

        let endDate = new Date(new Date(`${req.body.outdate}`).setHours(startDate.getHours() + 1));

        return {
            'start': startDate,
            'end': endDate
        }
    };


    // Insert new event to Google Calendar
    const insertEvent = async (event) => {

        try {
            let response = await calendar.events.insert({
                auth: auth,
                calendarId: calendarId,
                resource: event
            });

            if (response['status'] == 200 && response['statusText'] === 'OK') {
              
                return response.data.id;
            } else {
                return 0;
            }
        } catch (error) {
            console.log(`Error at insertEvent --> ${error}`);
            return 0;
        }
    };

    let dateTime = dateTimeForCalander();

    // // Event for Google Calendar
    let event = {
        'summary': `This is the summary.`,
        'description': `This is the description.`,
        'start': {
            'dateTime': dateTime['start'],
            'timeZone': 'Asia/Kolkata'
        },
        'end': {
            'dateTime': dateTime['end'],
            'timeZone': 'Asia/Kolkata'
        }
    };

    const eveId = await insertEvent(event)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
        });


    const booking = new Book({
        ...req.body,
        googleEventId:eveId,
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




//Guest data fatch
router.post('/BookingFatch', async (req, res) => {
    if (!req.body.useremail) {
        return res.status(400).send({ error: 'Please enter the Email Address!!!' });
    }
    if (!validate.emailCheck(req.body.useremail)) return res.status(400).send({ error: 'Enter Correct Email Address!!!' });

    try {
        const bookdata = await Book.find({ useremail: req.body.useremail, createdby: 'Guest' })
        if (bookdata.length == 0) return res.status(400).send({ error: 'Your Booking Detail is not available' });
        //  console.log("-------------",bookdata)
        res.status(200).send({ msg: 'Booking Detail', bookdata });

    } catch (error) {
        res.status(400).send({ error: 'some problem is occur in Villa booking!!!' });
    }

})



// User data fatch
router.get('/BookingFatch', verify, async (req, res) => {
    try {
        console.log("====3", req.user._id);
        const bookingDetail = await Book.find({ createdBy: req.user._id })

        if (bookingDetail.length == 0) return res.status(400).send({ error: 'Your Booking Detail is not available' });
        return res.status(200).send({ msg: 'Booking Detail', bookingDetail });
    } catch (error) {
        res.status(400).send({ error: 'some problem is occur in Villa booking!!!' });
    }

})


//Delete Villa Booking
router.delete('/deletebooking/:id', verify, async (req, res) => {
    const ids = req.params.id;
    console.log("backend----", ids);
    try {
        console.log("====3", req.user._id);
        const DeleteBooking = await Book.findOneAndDelete({ createdBy: req.user._id, _id: ids })
        console.log("=====4sdsdss", DeleteBooking);
        if (!DeleteBooking) return res.status(400).send({ error: 'Your Booking Detail is not available' });
        return res.status(200).send({ msg: 'Deleted', DeleteBooking });
    } catch (error) {
        res.status(400).send({ error: 'some problem is occur in Villa Booking Deleting!!!' });
    }

})












module.exports = router;