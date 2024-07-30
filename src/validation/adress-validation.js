import Joi from "joi";

const createValidationSchema = Joi.object({
    street : Joi.string().max(100).optional(),
    city : Joi.string().max(100).optional(),
    province : Joi.string().max(100).optional(),
    country : Joi.string().max(100).required(),
    postal_code : Joi.string().max(100).required(),
})

const updateAddressValidationSchema = Joi.object({
    id : Joi.number().min(1).positive().required(),
    street : Joi.string().max(100).optional(),
    city : Joi.string().max(100).optional(),
    province : Joi.string().max(100).optional(),
    country : Joi.string().max(100).required(),
    postal_code : Joi.string().max(100).required(),
})

const getAddressValidationSchema = Joi.number().min(1).positive().required();

export {
    createValidationSchema,
    getAddressValidationSchema,
    updateAddressValidationSchema
}