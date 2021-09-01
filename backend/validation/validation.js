const validator = require('validator');


const emailCheck = (email) => {
    if (validator.isEmail(email)) return true;
};

const lengthCheck = (checkString, minLength) => {

    if (checkString === '' || checkString.length < parseInt(minLength)) return true;
};
const numberlengthCheck = (checkNo, Length) => {

    if (checkNo.toString().length != parseInt(Length)) return true;
};

const strongPasswordCheck = (value) => {

    // eslint-disable-next-line no-useless-escape
    var strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

    if (!strongRegex.test(value)) {
        return true;
    }
};







module.exports = {
    emailCheck,
    lengthCheck,
    numberlengthCheck,
    strongPasswordCheck,
    
};


