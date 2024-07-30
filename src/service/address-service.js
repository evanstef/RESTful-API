import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createValidationSchema, updateAddressValidationSchema } from "../validation/adress-validation.js"
import { getValidationSchema } from "../validation/contact-validation.js"
import { validate } from "../validation/validation.js"

const checkContact = async (user,contactId) => { 
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

    return contactId
}

const create = async (user,contactId,request) => { 
    
    contactId = await checkContact(user,contactId)
    
    const address = validate(createValidationSchema, request)
    address.contact_id = contactId

    return prismaClient.adressess.create({
        data: address,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })

}

const get = async (user,contactId,addressId) => { 

    contactId = await checkContact(user,contactId)
    addressId = validate(getValidationSchema, addressId)

    const address = await prismaClient.adressess.findFirst({
        where: {
            contact_id: contactId,
            id : addressId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })

    if(!address) {
        throw new ResponseError(404, "address is not found")
    }

    return address
}

const update = async (user,contactId,request) => {
    contactId = await checkContact(user,contactId)

    const address = validate(updateAddressValidationSchema, request)

    const totalAddressInDatabase = await prismaClient.adressess.count({
        where: {
            contact_id: contactId,
            id : address.id
        }
    })

    if(totalAddressInDatabase !== 1) {
        throw new ResponseError(404, "address is not found")
    }

    return prismaClient.adressess.update({ 
        where: {
            id: address.id
        },
        data: {
            street : address.street,
            city : address.city,
            province : address.province,
            country : address.country,
            postal_code : address.postal_code
        },
        select : {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}

const remove = async (user,contactId,addressId) => {
    contactId = await checkContact(user,contactId)
    addressId = validate(getValidationSchema, addressId)

    const totalAddressInDatabase = await prismaClient.adressess.count({
        where: {
            contact_id: contactId,
            id : addressId
        }
    })  

    if(totalAddressInDatabase !== 1) {
        throw new ResponseError(404, "address is not found")
    }

    return prismaClient.adressess.delete({
        where: {
            id: addressId
        }
    })
}

const list = async (user,contactId) => {
    contactId = await checkContact(user,contactId)
    return prismaClient.adressess.findMany({
        where: {
            contact_id: contactId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}

export default {
    create,
    get,
    update,
    remove,
    list
}