# Adress API Spec

## Create Adress Api

Endpoint : POST /api/contact/:contactId/adress

Headers :
- Authorization : token

Request Body :
```json
{
    "street" : "Jl. Jendral Sudirman",
    "city" : "Jakarta",
    "province" : "DKI Jakarta",
    "country" : "Indonesia"
}
```

Response Body Success :

```json
{
    "status" : "success",
    "data" : {
        "id" : 1,
        "street" : "Jl. Jendral Sudirman",
        "city" : "Jakarta",
        "province" : "DKI Jakarta",
        "country" : "Indonesia"
    }
}
```

Response Body Failed :

```json
{
    "status" : "success",
    "data" : {
        "message" : "contact not found"
    }
}
```

## Update Adress Api

Endpoint : PUT /api/contact/:contactId/adress/:adressId

Headers :
- Authorization : token

Request Body :
```json
{
    "street" : "Jl. Jendral Sudirman",
    "city" : "Jakarta",
    "province" : "DKI Jakarta",
    "country" : "Indonesia"
}
```

Response Body Success :

```json
{
    "status" : "success",
    "data" : {
        "id" : 1,
        "street" : "Jl. Jendral Sudirman",
        "city" : "Jakarta",
        "province" : "DKI Jakarta",
        "country" : "Indonesia"
    }
}
```

Response Body Failed :

```json
{
    "status" : "success",
    "data" : {
        "message" : "adressess is not found"
    }
}
```

## Get Adress Api

Endpoint : GET /api/contact/:contactId/adress/:adressId

Headers :
- Authorization : token

Response Body Success :

```json
{
    "status" : "success",
    "data" : {
        "id" : 1,
        "street" : "Jl. Jendral Sudirman",
        "city" : "Jakarta",
        "province" : "DKI Jakarta",
        "country" : "Indonesia"
    }
}
```

Response Body Failed :

```json
{
    "status" : "success",
    "data" : {
        "message" : "contact is not found"
    }
}
```

## List Adress Api

Endpoint : GET /api/contact/:contactId/adress

Headers :
- Authorization : token

Response Body Success :

```json
{
    "status" : "success",
    "data" : [
        {
            "id" : 1,
            "street" : "Jl. Jendral Sudirman",
            "city" : "Jakarta",
            "province" : "DKI Jakarta",
            "country" : "Indonesia"
        },
        {
            "id" : 2,
            "street" : "Jl. Gatot Subroto",
            "city" : "Jakarta",
            "province" : "DKI Jakarta",
            "country" : "Indonesia"
        }
    ]
}
```

Response Body Failed :

```json
{
    "status" : "success",
    "data" : {
        "message" : "contact is not found"
    }
}
```

## Delete Adress Api

Endpoint : DELETE /api/contact/:contactId/adress/:adressId

Headers :
- Authorization : token

Response Body Success :

```json
{
    "status" : "success",
    "data" : {
        "message" : "adressess deleted"
    }
}
```

Response Body Failed :

```json
{
    "status" : "success",
    "data" : {
        "message" : "adressess not found"
    }
}
```