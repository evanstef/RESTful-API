import { prismaClient } from "../application/database.js"
const authMiddleware = async (req, res, next) => { 
    const token = req.get("Authorization")

    if(!token) {
        res.status(401).json({
            status : "success",
            message : "Unauthorized"
        }).end()
    } else {
        const user = await prismaClient.user.findFirst({
            where : {
                token : token
            }
        })
        if(!user) {
            res.status(401).json({
                status : "success",
                message : "Unauthorized"
            }).end()
        } else {
            req.user = user
            next()
        }
    }

}

export {
    authMiddleware
}