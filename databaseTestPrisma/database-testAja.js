import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt"


export const deleteUser = async () => {
    await prismaClient.user.deleteMany({
        where : {
            username : "test"
        }
    })
}

export const createUser = async () => {
    await prismaClient.user.create({
        data : {
            username : "test",
            password : await bcrypt.hash("test", 10),
            name : "test",
            token : "test"
        }
    })
}

export const getTestUser = async () => {
    return await prismaClient.user.findUnique({
        where : {
            username : "test"
        }
    })
}

export const deleteAllContacts = async () => {
    return await prismaClient.contact.deleteMany({
        where : {
            username : "test"
        }
    })
}


export const createTestContact = async () => {
    await prismaClient.contact.create({
        data : {
            username : "test",
            first_name : "test",
            last_name : "test",
            email : "test@gmail.com",
            phone : "091092029"
        }
    })
}

export const createManyTestContact = async () => {
    for (let i = 0; i <= 15; i++) { 
        await prismaClient.contact.create({
            data : {
                username : "test",
                first_name : `test ${i}`,
                last_name : `test ${i}`,
                email : `test${i}@gmail.com`,
                phone : `091092029${i}`
            }
        })
    }
}

export const getTestContact = async () => { 
    return prismaClient.contact.findFirst({
        where : {
            username : "test"
        }
    })
}

export const removeAllAddressContact = async () => {
     await prismaClient.adressess.deleteMany({
        where : {
            contact : {
                username : "test"
            }
        }
    })
}

export const createTestAddress = async () => {
    const contact = await getTestContact()
    await prismaClient.adressess.create({
        data : {
            contact_id : contact.id,
            street : "jalan kenangan",
            city : "Jakarta",
            province : "DKI Jakarta",
            country : "Indonesia",
            postal_code : "3321"
        }
    })
}

export const getTestAddress = async () => {
    return prismaClient.adressess.findFirst({
        where : {
            contact : {
                username : "test"
            }
        }
    })
}