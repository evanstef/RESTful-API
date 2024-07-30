## Create Contact Api

Endpoint : POST /api/contact

Headers :
- Authorization : token

Request Body :
```json
{
    "first_name" : "Evan",
    "last_name" : "Stefanus Candra",
    "email" : "evan@gmail.com",
    "phone" : "08123456789",
}
```

Response Body Success : 

```json
{
    "status" : "success",
    "data" : {
        "id" : 1,
        "first_name" : "Evan",
        "last_name" : "Stefanus Candra",
        "email" : "evan@gmail.com",
        "phone" : "08123456789",
    }
}
```

Response Body Failed :

```json
{
    "status" : "success",
    "data" : {
        "message" : "email is already in use"
    }
}
```

## Update Contact Api

Endpoint : PUT /api/contact/:id

Headers :
- Authorization : token

Request Body :
```json
{
    "first_name" : "Evan Baru",
    "last_name" : "Stefanus Candra Baru",
    "email" : "evan@gmail.com",
    "phone" : "08123456789",
}
```

Response Body Success :

```json
{
    "status" : "success",
    "data" : {
        "id" : 1,
        "first_name" : "Evan Baru",
        "last_name" : "Stefanus Candra Baru",
        "email" : "evan@gmail.com",
        "phone" : "08123456789",
    }
}
```

Response Body Failed :

```json
{
    "status" : "success",
    "data" : {
        "message" : "email is not valid"
    }
}
```


## Get Contact Api

Endpoint : GET /api/contact/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
    "status" : "success",
    "data" : {
        "id" : 1,
        "first_name" : "Evan",
        "last_name" : "Stefanus Candra",
        "email" : "evan@gmail.com",
        "phone" : "08123456789",
    }
}
```

Response Body Failed : 

```json
{
    "status" : "success",
    "data" : {
        "message" : "user is not login"
    }
}
```


## Search Contact Api
Endpoint : GET /api/contact/

Headers :
- Authorization : token

Query Params :
- name : Search by first_name or last_name, optional
- email : Search by email, optional
- phone : Search by phone, optional
- page : Page number, default 1 optional
- size : size per page, default 10, optional


Response Body Success :

```json
{
    "status" : "success",
    "data" : {
        "data" : [
            {
                "id" : 1,
                "first_name" : "Evan",
                "last_name" : "Stefanus Candra",
                "email" : "evan@gmail.com",
                "phone" : "08123456789",
            },
            {
                "id" : 2,
                "first_name" : "Evan",
                "last_name" : "Stefanus Candra",
                "email" : "evan@gmail.com",
                "phone" : "08123456789",
            }
        ]
    },
    "paging" : {
        "page" : 1,
        "total_page" : 3,
        "total_item" : 10
    }
}
```

## Delete Contact Api
Endpoint : DELETE /api/contact/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
    "status" : "success",
    "data" : {
        "message" : "contact deleted"
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



