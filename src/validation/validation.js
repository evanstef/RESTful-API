import { ResponseError } from "../error/response-error.js"

const validate = (schema, request) => {
    const result = schema.validate(request, {
        aboutEarly : false,
        allowUnknown : false
    })

    if(result.error) {
        throw new ResponseError(401, result.error.message)
    } else {
        return result.value
    }
}

export {
    validate
}