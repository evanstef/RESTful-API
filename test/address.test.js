import supertest from "supertest"
import { createTestAddress, createTestContact, createUser, deleteAllContacts, deleteUser, getTestAddress, getTestContact, removeAllAddressContact } from "../databaseTestPrisma/database-testAja.js"
import { web } from "../src/application/web.js"

describe("POST /api/contacts/:contactId/address", function () {
    beforeEach(async () => {
        await createUser() 
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllAddressContact()
        await deleteAllContacts()
        await deleteUser()
    })

    it("should pass when create address", async () => {

        const testContact = await getTestContact()

        const result = await supertest(web)
            .post("/api/contacts/" + testContact.id + "/address")
            .set("Authorization","test")
            .send({
                street : "jalan kenangan",
                city : "Jakarta",
                province : "DKI Jakarta",
                country : "Indonesia",
                postal_code : "3321"
            })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.street).toBe("jalan kenangan")
        expect(result.body.data.city).toBe("Jakarta")
        expect(result.body.data.province).toBe("DKI Jakarta")
        expect(result.body.data.country).toBe("Indonesia")
        expect(result.body.data.postal_code).toBe("3321")
    })

})

describe("GET /api/contacts/:contactId/address", function () {
    beforeEach(async () => {
        await createUser() 
        await createTestContact()
        await createTestAddress()
    })

    afterEach(async () => {
        await removeAllAddressContact()
        await deleteAllContacts()
        await deleteUser()
    })

    it("should pass when get address", async () => {

        const testContact = await getTestContact()
        const testAddress = await getTestAddress()

        const result = await supertest(web)
            .get("/api/contacts/" + testContact.id + "/address/" + testAddress.id)
            .set("Authorization","test")

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.street).toBe("jalan kenangan")
        expect(result.body.data.city).toBe("Jakarta")
        expect(result.body.data.province).toBe("DKI Jakarta")
        expect(result.body.data.country).toBe("Indonesia")
        expect(result.body.data.postal_code).toBe("3321")
    })

    it("should pass when invalid address id", async () => {

        const testContact = await getTestContact()
        const testAddress = await getTestAddress()

        const result = await supertest(web)
            .get("/api/contacts/" + testContact.id + "/address/" + 2)
            .set("Authorization","test")

        expect(result.status).toBe(404)
        expect(result.body.message).toBe("address is not found")
    })
})

describe("PUT /api/contacts/:contactId/address/:addressId", function () {
    beforeEach(async () => {
        await createUser() 
        await createTestContact()
        await createTestAddress()
    })

    afterEach(async () => {
        await removeAllAddressContact()
        await deleteAllContacts()
        await deleteUser()
    })

    it("should pass when update address", async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()

        const result = await supertest(web)
            .put("/api/contacts/" + testContact.id + "/address/" + testAddress.id)
            .set("Authorization","test")
            .send({
                street : "jalan kenangan baru",
                city : "Jakarta baru",
                province : "DKI Jakarta baru",
                country : "Indonesia baru",
                postal_code : "33212"
            })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testAddress.id)
        expect(result.body.data.street).toBe("jalan kenangan baru")
        expect(result.body.data.city).toBe("Jakarta baru")
        expect(result.body.data.province).toBe("DKI Jakarta baru")
        expect(result.body.data.country).toBe("Indonesia baru")
        expect(result.body.data.postal_code).toBe("33212")
    })
})

describe("DELETE /api/contacts/:contactId/address/:addressId", function () {
    beforeEach(async () => {
        await createUser() 
        await createTestContact()
        await createTestAddress()
    })

    afterEach(async () => {
        await removeAllAddressContact()
        await deleteAllContacts()
        await deleteUser()
    })

    it("should pass when delete address", async () => {

        const testContact = await getTestContact()
        let testAddress = await getTestAddress()

        const result = await supertest(web)
            .delete("/api/contacts/" + testContact.id + "/address/" + testAddress.id)
            .set("Authorization","test")
        
        expect(result.status).toBe(200)
        expect(result.body.message).toBe("success remove address")

        testAddress = await getTestAddress()
        expect(testAddress).toBeNull()
    })

})

describe("GET /api/contacts/:contactId/address", function () {
    beforeEach(async () => {
        await createUser() 
        await createTestContact()
        await createTestAddress()
    })

    afterEach(async () => {
        await removeAllAddressContact()
        await deleteAllContacts()
        await deleteUser()
    })

    it("should pass when list address", async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .get("/api/contacts/" + testContact.id + "/address")
            .set("Authorization","test")

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(1)
    })

    it("should pass when invalid contact id", async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .get("/api/contacts/" + 2 + "/address")
            .set("Authorization","test")    

        expect(result.status).toBe(404)
        expect(result.body.message).toBe("contact is not found")
    })
})