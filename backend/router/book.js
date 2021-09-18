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
const moment = require('moment');

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);
const TIMEOFFSET = '+05:30';
// var GoogleId=[]
// var BackGoogleId=[]

//check the availabity for booking
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

    const dateOutCheck = await Book.findOne({ outdate: req.body.outdate });
    if (dateOutCheck) return res.status(400).send({ error: 'Outdate is already Occupied please select new date' });

    console.log((await Book.findOne({ indatetime: { $lte: reqOutTime }, outdatetime: { $gte: reqInTime } })));
    if (await Book.findOne({ indatetime: { $lte: reqOutTime }, outdatetime: { $gte: reqInTime } }) !== null) {
        return res.status(400).send({ error: 'This sloat  is occupied' });
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






//get the booking date
router.get('/booking', async (req, res) => {

    var BackGoogleId = []
    var GoogleId = []


    try {
        const Googlebookdate = await Book.find({})
        if (Googlebookdate.length != 0) {
            Googlebookdate.map((item) => {
                BackGoogleId.push(item.googleEventId)
            })

        }

        const getEvents = async (dateTimeStart, dateTimeEnd) => {
            console.log("event call1");
            try {
                let response = await calendar.events.list({
                    auth: auth,
                    calendarId: calendarId,
                    timeMin: dateTimeStart,
                    timeMax: dateTimeEnd,
                    timeZone: 'Asia/Kolkata'
                });

                let items = response['data']['items'];
                return items;
            } catch (error) {
                console.log(`Error at getEvents --> ${error}`);
                return 0;
            }
        };
        const date = new Date()
        let start = date;
        let end = '2025-10-04T00:00:00.000Z';
       


        await getEvents(start, end)
            .then(async (res) => {

                const s2 = "keyurvastani1117@gmail.com".normalize()
                await res.map(async (item) => {
                    console.log("-----------first mapp calll");
                    GoogleId.push(item.id)

                })

                await res.map(async (item) => {
                    console.log("++++++++second event call2");

                    if ((item.creator.email).normalize() === s2) {
                        console.log("event call3");
                        if (BackGoogleId.includes(item.id) == false) {
                            console.log("event call4");
                            console.log("first stage");
                            const startDate = item.start.date ? item.start.date : item.start.dateTime;
                            console.log("==========================", startDate);

                            const decDate = new Date(item.end.date)

                            const decDate1 = new Date(decDate.getTime() - (24 * 60 * 60 * 1000));
                            const endDate = item.start.date ? moment(decDate1).format("YYYY-MM-DD") : item.end.dateTime
                            console.log("==========================", endDate);
                            const reqInTime = (new Date(startDate)).getTime()

                            const reqOutTime = (new Date(endDate)).getTime()

                            var GoogleDateSave = new Book({
                                indate: startDate,
                                outdate: endDate,
                                indatetime: reqInTime,
                                outdatetime: reqOutTime,
                                useremail: item.creator.email,
                                googleEventId: item.id,
                                googleSummary: item.summary ? item.summary : "Summary is not add by the Owner",
                                googleDescription: item.description ? item.description : "Description not add by the Owner"
                            });
                            await GoogleDateSave.save();
                            console.log("google data save in backend ======11");
                        }
                        else {
                            console.log("no require to store");
                        }
                    }

                });
                console.log("=3=3=3=3=3=3=3=33===", BackGoogleId.filter(item => !GoogleId.includes(item)));
                BackGoogleId.filter(item => !GoogleId.includes(item))
                    .map(async (eventId) => {
                        console.log("call delete api------------------111111111",);
                        await Book.findOneAndDelete({ googleEventId: eventId })
                        console.log("999999999 DElete data");
                    })


            })
            .catch((err) => {
                console.log(err);
            });


        setTimeout(async () => {
            console.log("this api call -----------------------2222")
            const bookdate = await Book.find({})

            res.status(200).send({ msg: 'book date', bookdate });
            console.log("-------33333");
        }, 1000);


    } catch (error) {
        res.status(400).send({ Msg: 'This sloat is not available!!!', error });

    }

})





// date is enter into database
router.post('/finalBooking', async (req, res) => {

    if (!req.body.indate || !req.body.outdate || !req.body.username || !req.body.useremail || !req.body.totalmember || !req.body.number)
        return res.status(400).send({ error: ' Username, Email and Mobile number  Filed is Required' });


    if (!validate.emailCheck(req.body.useremail)) return res.status(400).send({ error: 'Enter Correct Email Address!!!' });

    // console.log(((new Date("2021-12-21")).getTime()));
    // console.log(new Date(time.getTime()))

    const reqInTime = ((new Date(req.body.indate)).getTime())
    const reqOutTime = ((new Date(req.body.outdate)).getTime())
    //  console.log(reqInTime <= reqOutTime)




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


    const decDate = new Date(req.body.outdate)
    const decDate1 = new Date(decDate.getTime() + ((29.5 * 60 * 60 * 1000) - 1));
    const end = moment(decDate1).format("YYYY-MM-DD")

    // Event for Google Calendar
    let event = {
        'summary': `Villa is Booked by ${req.body.username}.`,
        'description': `name: ${req.body.username} ,  email : ${req.body.useremail} , mobile Number : ${req.body.number}`,
        'start': {
            'date': req.body.indate,
            // 'dateTime': dateTime['start'],
            'timeZone': 'Asia/Kolkata'
        },
        'end': {
            'date': end,

            // 'dateTime': dateTime['end'],
            'timeZone': 'Asia/Kolkata'
        },
        colorId: 1
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
        googleEventId: eveId,
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
    if (!req.body.useremail && !req.body.number) {
        return res.status(400).send({ error: 'Please enter the Email Address  Or Mobile Number!!!' });
    }
    if (!validate.emailCheck(req.body.useremail)) return res.status(400).send({ error: 'Enter Correct Email Address!!!' });
    // if (validate.numberlengthCheck(req.body.phone, 10) || isNaN(req.body.phone)) return res.status(400).send({ error: 'Enter valid Mobile Number' });
    try {
        const bookdata = await Book.find({ useremail: req.body.useremail, createdby: 'Guest' })
        if (bookdata.length == 0) return res.status(400).send({ error: 'Your Booking Detail is not available' });
        console.log("-------------", bookdata)
        console.log(typeof (bookdata[0].number));
        const s1 = bookdata[0].number
        const s2 = req.body.number

        if (s1.normalize() !== s2.normalize()) {
            return res.status(400).send({ error: 'Your Number is not match' });
        }
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
        const DeleteBooking = await Book.findOneAndDelete({ createdBy: req.user._id, _id: ids, })
        const eventId = DeleteBooking.googleEventId
        const deleteEvent = async (eventId) => {
            try {
                let response = await calendar.events.delete({
                    auth: auth,
                    calendarId: calendarId,
                    eventId: eventId
                });

                if (response.data === '') {
                    return 1;
                } else {
                    return 0;
                }
            } catch (error) {
                console.log(`Error at deleteEvent --> ${error}`);
                return 0;
            }
        };

        deleteEvent(eventId)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        console.log("====3", req.user._id);
        // const DeleteBooking = await Book.findOneAndDelete({ createdBy: req.user._id, _id: ids, })

        if (!DeleteBooking) return res.status(400).send({ error: 'Your Booking Detail is not available' });
        return res.status(200).send({ msg: 'Deleted', DeleteBooking });
    } catch (error) {
        res.status(400).send({ error: 'some problem is occur in Villa Booking Deleting!!!' });
    }

})












module.exports = router;