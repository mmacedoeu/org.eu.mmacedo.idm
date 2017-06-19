# About 

This solution provides both oauth2 Authorization Server and Resource Server unified in a single instance. It is using the oauth2 password flow with trusted pre authorized client-id running in a web application

# Endpoints

Authorization Server is binded to uri /oauth/token and /oauth/authorize
but client authorization is currently fixed in memory, you can use the token endpoint to get new access token and refresh token

## Json Web Token

The generated token is using the new JWT schema where user roles and other info is cryptographically secured and there is not need for the resource server to send the token to the Authorization endpoint asking for validation. This is done by having the symmetrical key and thus evicting a net trip. 

# Protected Resources

There is two entities backed by MongoDB, User entity for authentication and role based authorization and Employee entity for CRUD operations exposed via REST endpoints /users and /employees 

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

To get and Access Token via curl:

`curl -v https://fooClientIdPassword:secret@api.crudglobo.ml/oauth/token -d grant_type=password -d client_id=fooClientIdPassword -d username=admin -d password=admin`

## Credentials

There is a hardcoded in memory admin:admin credential used to bootstrap the application once you create other Users by /users REST endpoint you can remove it on code and redeploy for security reasons