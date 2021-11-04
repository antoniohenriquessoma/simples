
'user strict'

const getUniqueErrorMessage = (err) => {

    let output
    try {
        let fielName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'))
        output = fielName.charAt(0).toUpperCase() + fielName.slice(1) +
        ' Ja existe'
    } catch (ex) {
        output = 'Campo unico ja existe'
    }
    return output;
}

const getErrorMessage = (err) => {

    let message = '';

    if(err.code){
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err)
                break;
        
            default:
                message = 'Algo deu Errado'
        }
    }else{
        for(let errName in err.errors){
            if(err.errors[errName].message)
            message = err.errors[errName].message
        }
    }
    return message;
}



export default {getErrorMessage}