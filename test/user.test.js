import { createUser, deleteUser, getTestUser } from "../databaseTestPrisma/database-testAja.js";
import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/winston.js";
import bcrypt from "bcrypt"

describe("POST /api/users", function () {
    afterEach(async () => {
        await deleteUser()
    })
    it("should pass when create user", async () => { 
        const result = await supertest(web)
            .post("/api/users")
            .send({
                username : "test",
                password : "test",
                name : "test"
            })
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("test")
        expect(result.body.data.password).toBeUndefined()
    })
})


describe("POST /api/users/login", function () {
    beforeEach(async () => {
        await createUser()
    })
    afterEach(async () => {
        await deleteUser()
    })

    it("should pass when login user", async () => { 
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username : "test",
                password : "test",
            })

       
        expect(result.status).toBe(200)
        expect(result.body.data.token).toBeDefined()
    })

    it("should pass when login user", async () => { 
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username : "asdas",
                password : "test",
            })

        logger.info(result.body)
        expect(result.status).toBe(401)
        expect(result.body.message).toBe("Username or Password is not found")
    })
})


describe("GET /api/user/current", function () {
    beforeEach(async () => {
        await createUser()
    })
    afterEach(async () => {
        await deleteUser()
    })

    it("should pass when get user", async () => { 
        const result = await supertest(web)
            .get("/api/user/current")
            .set("Authorization", "test")
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("test")
    })

    it("should error when wrong token" , async () => { 
        const result = await supertest(web)
            .get("/api/user/current")
            .set("Authorization", "wrong")
        expect(result.status).toBe(401)
        expect(result.body.message).toBe("Unauthorized")
    })
})

describe("PATCH /api/user/current", function () {
    beforeEach(async () => {
        await createUser()
    })
    afterEach(async () => {
        await deleteUser()
    })
    it("should pass when update user", async () => { 
        const result = await supertest(web)
            .patch("/api/user/current")
            .set("Authorization", "test")
            .send({
                name : "Evan",
                password : "testlagi"
            })
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("Evan")

        const user = await getTestUser()
        expect(await bcrypt.compare("testlagi", user.password)).toBe(true)
    })
})

describe("DELETE /api/users/logout", function () {
    beforeEach(async () => {
        await createUser()
    })
    afterEach(async () => {
        await deleteUser()
    })
    it("should pass when logout user", async () => { 
        const result = await supertest(web)
            .delete("/api/users/logout")
            .set("Authorization", "test")
        expect(result.status).toBe(200)
        expect(result.body.message).toBe("OK")
    
        const user = await getTestUser()
        expect(user.token).toBeNull()
    })
})