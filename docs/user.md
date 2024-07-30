## Register User Api

Endpoint : POST /api/register

Request Body : 
```json
{
    "username" : "Evan Stefanus Candra",
    "name" : "Evan",
    "password" : "123456"
}
```

Response Body Success : 

```json
{
  "status" : "success",
  "data" : {
    "username" : "Evan Stefanus Candra",
    "name" : "Evan"
  }
}
```

Response Body Failed : 

```json
{
  "status" : "success",
  "data" : {
    "message" : "username already exist"
  }
}
```

## Login User Api

Endpoint : POST /api/login

Request Body :

```json
{
    "username" : "Evan Stefanus Candra",
    "password" : "123456"
}
```

Response Body Success :

```json
{
    "status" : "success",
    "data" : {
      "token" : "unique-token"
    }
}
```

Response Body Failed :

```json
{
    "status" : "success",
    "data" : {
      "message" : "username or password is incorrect"
    }
}
```


## Update User Api

Endpoint : PUT /api/user

Header : Authorization

Request Body :

```json
{
    "name" : "Evan Stefanus Candra Baru", // optional
    "password" : "123456" // optional
}
```

Response Body Success :

```json
{
    "status" : "success",
    "data" : {
        "username" : "Evan Stefanus Candra",
        "name" : "Evan Stefanus Candra Baru",
    }
}
```

Response Body Failed :

```json
{
    "status" : "success",
    "data" : {
        "message" : "name length max 20 character"
    }
}
```

## GET User Api

Endpoint : GET /api/user/current

Header : Authorization

Response Body Success :

```json
{
    "status" : "success",
    "data" : {
        "username" : "Evan Stefanus Candra",
        "name" : "Evan Stefanus Candra Baru",
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


## Logout User Api

Endpoint : DELETE  /api/logout

Header : Authorization

Response Body Success :

```json
{
    "status" : "success",
    "data" : {
        "message" : "logout success"
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