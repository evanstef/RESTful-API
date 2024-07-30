import supertest from "supertest";
import { createManyTestContact, createTestContact, createUser, deleteAllContacts, deleteUser, getTestContact } from "../databaseTestPrisma/database-testAja.js";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/winston.js";

describe("POST /api/contacts", function () {
    beforeEach(async () => {
        await createUser()
    })

    afterEach(async () => {
        await deleteAllContacts()
        await deleteUser()
    })

    it("should pass when create contact", async () => { 
        const result = await supertest(web)
            .post("/api/contacts")
            .set("Authorization","test")
            .send({
                first_name : "test",
                last_name : "test",
                email : "test@gmail.com",
                phone : "091092029"
            })
        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.first_name).toBe("test")
        expect(result.body.data.last_name).toBe("test")
        expect(result.body.data.email).toBe("test@gmail.com")
        expect(result.body.data.phone).toBe("091092029")
    })
})


describe("GET /api/contacts", function () {
    beforeEach(async () => {
        await createUser() 
        await createTestContact()
    })

    afterEach(async () => {
        await deleteAllContacts()
        await deleteUser()
    })

    it("should pass when get contact", async () => { 
        const testContact = await getTestContact()

        const result = await supertest(web)
            .get("/api/contacts/" + testContact.id)
            .set("Authorization","test")
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.first_name).toBe("test")
        expect(result.body.data.last_name).toBe("test")
        expect(result.body.data.email).toBe("test@gmail.com")
        expect(result.body.data.phone).toBe("091092029")
    })
})


describe("PUT /api/contacts", function () {
    beforeEach(async () => {
        await createUser() 
        await createTestContact()
    })

    afterEach(async () => {
        await deleteAllContacts()
        await deleteUser()
    })

    it("should pass when update contact", async () => {
        const testContact = await getTestContact()
        const result = await supertest(web)
            .put("/api/contacts/" + testContact.id)
            .set("Authorization","test")
            .send({
                first_name : "testUpdate",
                last_name : "testUpdate",
                email : "testUpdate@gmail.com",
                phone : "091092029"
            })
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.first_name).toBe("testUpdate")
        expect(result.body.data.last_name).toBe("testUpdate")
        expect(result.body.data.email).toBe("testUpdate@gmail.com")
        expect(result.body.data.phone).toBe("091092029")
    })

    it("should pass when update contact with invalid id", async () => {
        const result = await supertest(web)
            .put("/api/contacts/100")
            .set("Authorization","test")
            .send({
                first_name : "testUpdate",
                last_name : "testUpdate",
                email : "testUpdate@gmail.com",
                phone : "091092029"
            })
        expect(result.status).toBe(404)
    })
})

describe("DELETE /api/contacts", function () {
    beforeEach(async () => {
        await createUser() 
        await createTestContact()
    })

    afterEach(async () => {
        await deleteAllContacts()
        await deleteUser()
    })

    it("should pass when delete contact", async () => {
        const testContact = await getTestContact()
        
        const result = await supertest(web)
            .delete("/api/contacts/" + testContact.id)
            .set("Authorization","test")
        expect(result.status).toBe(200)
        expect(result.body.message).toBe("contact is deleted")
    })
})

describe("GET /api/contacts", function () {
    beforeEach(async () => {
        await createUser()
        await createManyTestContact()
    })

    afterEach(async () => {
        await deleteAllContacts()
        await deleteUser()
    })

    it("should pass when search contact", async () => {
        const result = await supertest(web)
            .get("/api/contacts")
            .set("Authorization","test")

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(10)
        expect(result.body.paging.total_page).toBe(2)
    })

    it("should pass when search contact page 2", async () => {
        const result = await supertest(web)
            .get("/api/contacts")
            .query({
                page : 2
            })
            .set("Authorization","test")  
            
            expect(result.status).toBe(200)
            expect(result.body.data.length).toBe(6)
            expect(result.body.paging.page).toBe(2)
            expect(result.body.paging.total_items).toBe(16)
            expect(result.body.paging.total_page).toBe(2)
    })

    it("should pass when search contact with name", async () => {
        const result = await supertest(web)
            .get("/api/contacts")
            .query({
                name : "test 1"
            })
            .set("Authorization","test")  
            
            expect(result.status).toBe(200)
            expect(result.body.data.length).toBe(7)
            expect(result.body.paging.page).toBe(1)
            expect(result.body.paging.total_items).toBe(7)
            expect(result.body.paging.total_page).toBe(1)
    })

    it("should pass when search contact with email", async () => {
        const result = await supertest(web)
            .get("/api/contacts")
            .query({
                email : "test1"
            })
            .set("Authorization","test")  
            
            expect(result.status).toBe(200)
            expect(result.body.data.length).toBe(7)
            expect(result.body.paging.page).toBe(1)
            expect(result.body.paging.total_items).toBe(7)
            expect(result.body.paging.total_page).toBe(1)
    })
})