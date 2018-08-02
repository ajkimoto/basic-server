# Basic Server #

__This is a basic node server using Express and Sequelize and is designed to work
with an Amazon RDS MySQL database__

### Overview
This server utilizes JSON web tokens.  At this time the authentication is stubbed
and utilizes a dummy user object that would in reality be returned to the server
from a database query.  The id is then passed (along with a secret string)to the
jwt module that returns the token.

The itech routes first pass through a method that validates the token and adds the
user id to the req object.

API Errors is by a custom error handler method

### Deployment
To deploy this server, you will need to set up a table in an Amazon
RDS MySQL instance.  Use the syntax below to create the tech-locations table:

```CREATE TABLE `tech-locations` (
  `id` char(36) NOT NULL,
  `longitude` varchar(45) DEFAULT NULL,
  `latitude` varchar(45) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;```

To run the server locally, clone the repo, perform `npm install`.  You will need
to replace the entries in config.json with the appropriate settings for your
Amazon RDS instance. and then `npm run start`.
The server runs on port 5000. 

The calls made to `api/itech` expect a JSON web token assigned to the `x-access-token`
header.

To create a token for use in Postman or other API development environments, perform a 
POST request to `/api/auth/login` route with a JSON body in the format:

`{ userName: "<username>", password: "<password>" }`

and a JSON web token will be returned.  assign this to the `x-access-token` header and use this in all
`/api/itech` requests.

NOTE that the authentication route is currently stubbed.

### API

Api method user JSON for CRUD operations

#### Update GeoLocation

```POST /api/itech/location```

Updates the geo location of a user.

req.user is required (This id is added by the authentication system)
req.body is required.  The body should be JSON in the format:

`{ lat: "<latitude>", long: "<long>"}`

Response will be 'OK' if successful (including cases where the
geo-location is unchanged)

##### Get Users

```GET /api/itech/supply```

Gets users near given geo location

This is currently stubbed and returns a 501 not implemented error.

##### Get a JSON web token from dummy authentication route

`POST /api/auth/login`

This stubbed route does not actually authenticate the user but still
requires a JSON body in the format:

`{ userName: "<userName">, password: "<password>" }` 

This data is currently discarded and a dummy user object is created.
The id of this user object is passed to the method that returns a JSON
web token.

TODO: actually authenticate vs. a user table