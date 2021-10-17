# RistoranteExpressServer

## Necessary Software
I used visual studio code to make this REST API but any editor should work. If you download the files you will need the node modules to run the site. So navigate to the directory of where you saved the confusion folder and install the dependencies by running: 

<pre>npm install --force</pre>

I used Postman to test the server, so to see it in action just open Postman and location the server is running on is:

<pre>https://localhost:3443/</pre>

Note that I have used SSL to make the https server but Postman will not recognized it since it is a self signed certificate. Thus in Postman go to settings and disable SSL Certificate Verification.

## Demo
Coming soon!

## Description
This is a REST API server made using Node.js, Express, MongoDB, and Mongoose ODM. I used Postman to test that it was working as expected. In this server I have implemented the GET, POST, PUT, and DELETE requests across several endpoints. I used SSL to implement a https server and also implemented Facebook OAuth as an alternate way for users to sign in.

Here is a list of the endpoints defined and what they do:

### /users Endpoint
- GET on /users endpoint, this request will return a list of all the users in the database note this can only be performed by admin
- POST on /users/signup endpoint, this allows a user to sign up for the database
- POST on /users/login endpoint, this allows the user to login and will return a bearer token that will be used to authorize the user for any further operations
- GET on /users/logout endpoint, this destroys the session and logs out the user
- GET on /users/facebook/token endpoint, this logs in the user using Facebook OAuth and will return a bearer token that will be used to authorize the user for any further operations

### /dishes Endpoint
- GET on /dishes endpoint, this will return a list of all dishes anyone can make this request whether logged in or not
- POST on /dishes endpoint, this will add a dish to the database, only admin can do this
- PUT on /dishes endpoint, it is restricted and will return an error
- DELETE on /dishes endpoint, this will delete all dishes in the database, only admin can do this
- GET, PUT, POST, DELETE on /dishes/:dishId does the same as above but for a specific dish, note that in this case POST returns an error and PUT will update a specific dish. Furthermore PUT and DELETE are restricted to admin
- GET on /dishes/:dishId/comments endpoint, this returns the comments of a dish, anyone can perform this whether logged in or not
- POST on /dishes/:dishId/comments endpoint, this adds a comment to the dish note only a logged in user can do this
- PUT on /dishes/:dishId/comments endpoint, restriced and will return an error
- DELETE on /dishes/:dishId/comments endpoint, this will delete all the comments posted by a logged in user, note a user can delete their own comments
- GET, PUT, POST, DELETE on /dishes/:dishId/comments/:commentId does the same as above but for a specific comment, note that in this case POST returns an error and PUT will update a specific comment. Furthermore PUT and DELETE are restricted to logged in users

### /leaders Endpoint
- GET, PUT, POST, and DELETE defined on /leaders and /leaders/:leaderId note that they work the same as /dishes and /dishes/:dishId

### /promotions Endpoint
- GET, PUT, POST, and DELETE defined on /promotions and /promotions/:promoId note that they work the same as /dishes and /dishes/:dishId

### /imageUpload Endpoint
- Restricted to only admin
- GET on /imageUpload endpoint, allows an admin to put an image in the database
- POST on /imageUpload endpoint, allows an admin to update an image in the database
- PUT on /imageUpload endpoint, restricted and will return error
- DELETE on /imageUpload endpoint, restricted and will return error

### /favourites Endpoint
- Restricted to logged in users
- GET on /favourites endpoint, will return any dishes a user marks as a favourite
- POST on /favourites endpoint, will add a dish to favourties list
- PUT on /favourites endpoint, restriced and will return an error
- DELETE on /favourites endpoint, will delete all the favourites of a specific user, note only a user can delete their own favourites
- GET, POST, PUT, and DELETE on /favourites/:dishId does the same as above except for specific favourites, note that in this case PUT is still restriced and POST is still functional

## Pictures
Coming Soon!
