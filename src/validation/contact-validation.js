import Joi from "joi";

const createValidationSchema = Joi.object({
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).optional(),
    email: Joi.string().max(100).email().optional(),
    phone: Joi.string().max(100).optional(),
});

const getValidationSchema = Joi.number().positive().required();

const updateValidationSchema = Joi.object({
    id : Joi.number().positive().required(),
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).optional(),
    email: Joi.string().max(100).email().optional(),
    phone: Joi.string().max(100).optional(),
});

const searchValidationSchema = Joi.object({
    page : Joi.number().min(1).positive().default(1),
    size : Joi.number().min(1).positive().max(100).default(10),
    name : Joi.string().max(100).optional(),
    email : Joi.string().max(100).optional(),
    phone : Joi.string().max(100).optional(),
})

export {
    createValidationSchema,
    getValidationSchema,
    updateValidationSchema,
    searchValidationSchema
}