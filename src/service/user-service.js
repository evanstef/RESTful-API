import { validate } from "../validation/validation.js"
import { getUserValidation, loginUserValidationSchema, updateUserValidationSchema, userValidationSchema } from "../validation/user-validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import {v4 as uuid} from "uuid"
import bcrypt from "bcrypt"

const register = async (request) => {
    const user = validate(userValidationSchema, request)

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    })

    if(countUser.length === 1) {
        throw new ResponseError(401, "Username already exist")
    } 

    // menghasing password yang di input oleh user
    user.password = await bcrypt.hash(user.password, 10)

    // menyimpan data user yang baru
    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    })
}

const login = async (request) => { 
    const result = validate(loginUserValidationSchema, request)

    const user = await prismaClient.user.findUnique({
        where: {
            username: result.username
        },
        select: {
            username: true,
            password: true
        }
    })

    if(!user) {
        throw new ResponseError(401, "Username or Password is not found")
    }

    const checkPassword = await bcrypt.compare(result.password, user.password)

    if(!checkPassword) {
        throw new ResponseError(401, "Username or Password is not found")
    }

    const token = uuid().toString()
    return prismaClient.user.update({
       data : {
           token : token
       },
       where : {
           username : user.username
       },
       select : {
           token : true
       }
    })
}

const get = async (username) => { 
    username = validate(getUserValidation, username)
    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            name: true
        }
    })

    if(!user) {
        throw new ResponseError(404, "user is not found")
    }

    return user
}

const update = async (request) => {
    const user = validate(updateUserValidationSchema, request)

    const totalUserInDatabase = await prismaClient.user.count({
        where: {
            username: user.username
        }
    })

    if(totalUserInDatabase !== 1) { 
        throw new ResponseError(404, "user is not found")
    }

    const data = {}

    if(user.name) {
        data.name = user.name
    }

    if(user.password) {
        data.password = await bcrypt.hash(user.password, 10)
    }

    return prismaClient.user.update({
        where: {
            username: user.username
        },
        data: data,
        select: {
            username: true,
            name: true
        }

    })
}

const logout = async (username) => {
    username = validate(getUserValidation, username)

    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        }
    })

    if(!user) {
        throw new ResponseError(404, "user is not found")
    }
    // update token
    await prismaClient.user.update({
        where: {
            username: username
        },
        data: {
            token: null
        }
    })
}

export default {
    register,
    login,
    get,
    update,
    logout
}