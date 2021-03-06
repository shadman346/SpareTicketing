import{ValidationError} from 'express-validator'
import { CustomError } from "./custom-error";
export class RequestValidationError extends CustomError{
    statusCode = 400;
    constructor(public errors: ValidationError[]){
        super('invalid req parameters')

        //only because we are extending built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors(){
        const formattedErrors = this.errors.map(error => {
            return {message: error.msg , field: error.param};
        })
        return formattedErrors
    }
}