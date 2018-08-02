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

### API

Api method user JSON for CRUD operations

#### Update GeoLocation

```POST /api/itech/location```

Updates the geo location of a user.  Returns 'OK' if successful

req.user is required (This id is added by the authentication system)
req.body is required and must contain __lat__ and __long__ (latitude and
longitude) properties

### Get Users

```GET /api/itech/supply```

Gets users near given geo location

This is currently stubbed and returns a 501 not implemented error.