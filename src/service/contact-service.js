import { valid } from "joi";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createValidationSchema, getValidationSchema, searchValidationSchema, updateValidationSchema } from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const create = async (user,request) => {
    const contact = validate(createValidationSchema, request);
    contact.username = user.username

    return prismaClient.contact.create({
        data: contact,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
}

const get = async (user, contactId) => {
    contactId = validate(getValidationSchema, contactId)

    const contact = await prismaClient.contact.findFirst({
        where: {
            username: user.username,
            id : contactId
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })


    if(!contact) {
        throw new ResponseError(404, "contact is not found")
    }

    return contact
}


const update = async (user,request) => {
    const contact = validate(updateValidationSchema, request);

    const totalContactInDatabase = await prismaClient.contact.count({
        where: {
            username: user.username,
            id : contact.id
        }
    })

    if(totalContactInDatabase !== 1) {
        throw new ResponseError(404, "contact is not found")
    }

    return prismaClient.contact.update({ 
        where: {
            id : contact.id
        }, 
        data : {
            first_name : contact.first_name,
            last_name : contact.last_name,
            email : contact.email,
            phone : contact.phone
        },
        select : {
            id : true,
            first_name : true,
            last_name : true,
            email : true,
            phone : true
        }
    })
}

const remove = async (user, contactId) => {
    contactId = validate(getValidationSchema, contactId)

    const totalContactInDatabase = await prismaClient.contact.count({
        where: {
            username: user.username,
            id : contactId
        }
    })

    if(totalContactInDatabase !== 1) {
        throw new ResponseError(404, "contact is not found")
    }

    return prismaClient.contact.delete({
        where: {
            id : contactId
        }
    })
}

const search = async (user, request) => { 
    request = validate(searchValidationSchema, request);


    const skip = (request.page - 1) * request.size
    const filters = []

    filters.push({
        username : user.username
    })

    if(request.name) {
        filters.push(
            {
                OR : [
                    {
                        first_name : {
                            contains : request.name
                        }
                    },
                    {
                        last_name : {
                            contains : request.name
                        }
                    }
                ]
            }
        )
    }

    if(request.email) {
        filters.push(
            {
                email : {
                    contains : request.email
                }
            }
        )
    }

    if(request.phone) { 
        filters.push(
            {
                phone : {
                    contains : request.phone
                }
            }
        )
    }

    const contact = await prismaClient.contact.findMany({
        where: { 
            AND : filters
        },
        take : request.size,
        skip : skip
    })

    const totalItems = await prismaClient.contact.count({
        where: {
            AND : filters
        }
    })

    return {
        data : contact,
        paging : {
            page : request.page,
            total_items : totalItems,
            total_page : Math.ceil(totalItems / request.size)
        }
    }
}


export default {
    create, 
    get,
    update,
    remove,
    search
}