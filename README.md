# About 

This solution provides both oauth2 Authorization Server and Resource Server unified in a single instance. It is using the oauth2 password flow with trusted pre authorized client-id running in a web application

# Endpoints

Authorization Server is binded to uri /oauth/token and /oauth/authorize
but client authorization is currently fixed in memory, you can use the token endpoint to get new access token and refresh token

## Json Web Token

The generated token is using the new JWT schema where user roles and other info is cryptographically secured and there is not need for the resource server to send the token to the Authorization endpoint asking for validation. This is done by having the symmetrical key and thus evicting a net trip. 

# Protected Resources

There is two entities backed by MongoDB, User entity for authentication and role based authorization and Employee entity for CRUD operations exposed via REST endpoints /users and /employee 

## CORS

All endpoints are CORS enabled and can securely used in a web browser

# Web client

Access to Web client is protected by password credentials backed by the /oauth/token and further CRUD operations on protected resources is carried using a bearer access token. Once the access token expires you need to login again as the refresh token policy is not currently used here for even higher security. All operations is carried in a SSL protected https channel.

# Building

## Server

Make sure you have Maven installed or use the mvnw script to install it for you

`mvn clean package` or `mvnw clean package`

To run a local instance you use either `mvn spring-boot:run` or `mvnw spring-boot:run`

## Web client

Make sure you have nodejs and npm, you can also use yarn in place of npm:

`cd webapp && npm i roadhog -g && npm install && npm run build`

To run a local development environment:

`npm run dev` or `yarn run dev`

# Demo

There is a demo server running at https://www.crudglobo.ml for front-end client and backend at https://api.crudglobo.ml

## Testing

Testing is done manually via curl-client or web-client:

To get access denied trying to get access_token without client credentials:

`curl -v https://api.crudglobo.ml/oauth/token -d grant_type=password -d client_id=fooClientIdPassword -d username=admin -d password=admin`

```json
{"timestamp":1497892559092,"status":401,"error":"Unauthorized","message":"Full authentication is required to access this resource","path":"/oauth/token"}
```

To get access denied trying to provide bad password credentials:

`curl -v https://fooClientIdPassword:secret@api.crudglobo.ml/oauth/token -d grant_type=password -d client_id=fooClientIdPassword -d username=admin -d password=123`

```json
{"error":"invalid_grant","error_description":"Bad credentials"}
```

To get access denied trying to access a resource without credentials:

`curl https://fooClientIdPassword:secret@api.crudglobo.ml`

```json
{"error":"unauthorized","error_description":"Full authentication is required to access this resource"}
```

To get and Access Token via curl:

`curl -v https://fooClientIdPassword:secret@api.crudglobo.ml/oauth/token -d grant_type=password -d client_id=fooClientIdPassword -d username=admin -d password=admin`

```json
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0OTc4OTU1NzQsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiI5MzkxNjQxYy0xOGFjLTQ3M2UtOGYwMy1lMjZhMGFkZjFhNWYiLCJjbGllbnRfaWQiOiJmb29DbGllbnRJZFBhc3N3b3JkIiwic2NvcGUiOlsiZm9vIiwicmVhZCIsIndyaXRlIl19.ucPEhqHvt2TcqCljPNonDddzGJIBi6ag2gYcl3a_pPs","token_type":"bearer","refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbImZvbyIsInJlYWQiLCJ3cml0ZSJdLCJhdGkiOiI5MzkxNjQxYy0xOGFjLTQ3M2UtOGYwMy1lMjZhMGFkZjFhNWYiLCJleHAiOjE1MDA0ODM5NzQsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwianRpIjoiYmEyNWVkZDMtNzI5NS00Nzk4LTkwYjUtNmI0MTgxMDZjMTkzIiwiY2xpZW50X2lkIjoiZm9vQ2xpZW50SWRQYXNzd29yZCJ9.NPWfBVaDII8oV0xyyCY0TRlXfUGBzy_rNPwhlaIPqxs","expires_in":3599,"scope":"foo read write","jti":"9391641c-18ac-473e-8f03-e26a0adf1a5f"}
```

on bash:

`export access_token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0OTc4OTU1NzQsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiI5MzkxNjQxYy0xOGFjLTQ3M2UtOGYwMy1lMjZhMGFkZjFhNWYiLCJjbGllbnRfaWQiOiJmb29DbGllbnRJZFBhc3N3b3JkIiwic2NvcGUiOlsiZm9vIiwicmVhZCIsIndyaXRlIl19.ucPEhqHvt2TcqCljPNonDddzGJIBi6ag2gYcl3a_pPs"`

To view avaliable Resource endpoints:

`curl https://api.crudglobo.ml -H "Authorization: Bearer ${access_token}"`

```json
{
  "_links" : {
    "employee" : {
      "href" : "http://api.crudglobo.ml/employee{?page,size,sort}",
      "templated" : true
    },
    "users" : {
      "href" : "http://api.crudglobo.ml/users{?page,size,sort}",
      "templated" : true
    },
    "profile" : {
      "href" : "http://api.crudglobo.ml/profile"
    }
  }
}
```

To list employees: 

`curl https://api.crudglobo.ml/employee -H "Authorization: Bearer ${access_token}"`



## Credentials

There is a hardcoded in memory admin:admin credential used to bootstrap the application once you create other Users by /users REST endpoint you can remove it on code and redeploy for security reasons

# Roadmap

*  Map user roles to token scopes
*  Field level security by roles to access things like Salary
*  Web client update password
*  Web client refresh token
*  Web client automatic logout after token expired
*  Two/Multi Factor Authentication