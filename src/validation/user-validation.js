import Joi from "joi"

const userValidationSchema = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required()
})

const loginUserValidationSchema = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
})

const getUserValidation = Joi.string().max(100).required()

const updateUserValidationSchema = Joi.object({
    username : Joi.string().max(100).required(),
    name: Joi.string().max(100).optional(),
    password: Joi.string().max(100).optional()
})

export {
    userValidationSchema,
    loginUserValidationSchema,
    getUserValidation,
    updateUserValidationSchema
}