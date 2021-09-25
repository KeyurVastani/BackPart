const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
const nameRegex = /^[a-zA-Z\-]+$/;
const phoneno = /^\d{10}$/
export const ValidPassword = (password) => {
    if (!strongRegex.test(password)) {
        return true;
    }
}

export const ValidEmail= (email) => {
    if (!re.test(String(email).toLowerCase())) {
        return true;
    }
}

export const ValidName= (name) => {
    if (!nameRegex.test(name)) {
        return true;
    }
}
export const ValidNumber= (number) => {
    if (!phoneno.test(number)) {
        return true;
    }
}