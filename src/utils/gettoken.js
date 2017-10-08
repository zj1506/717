export default function gettoken(){
    let c = document.cookie.split(";");

    let token;
    c.forEach((val) => {
        if (val.indexOf("1505B") > -1) {
            token = val.split("=")[1]
        }
    })

    return token
}


