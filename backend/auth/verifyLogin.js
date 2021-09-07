const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send({ error: 'you must to need login!!!' });

    try {console.log("0909090990")
        const verified = jwt.verify(token, 'LanetDemobikeProject');
        console.log("==1=",verified);

        req.user = verified;
        next();
        console.log("====2",verified);
    } catch (error) {
        res.status(404).send({error:'Invalid Token!!!'});
    }
};

module.exports = verify;