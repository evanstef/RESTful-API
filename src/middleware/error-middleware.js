import { ResponseError } from "../error/response-error.js"

const errorMiddleware = (err, req, res, next) => { 
    if(!err) {
        next()
        return;
    }

    if(err instanceof ResponseError) {
        res.status(err.status).json({
            status : "success",
            message : err.message
        })
    } else {
        res.status(500).json({
            status : "success",
            message : "Internal server error"
        })
    }
}

export { errorMiddleware }