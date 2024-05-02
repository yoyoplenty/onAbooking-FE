# ON A BOOKING

## *PRODUCT DOCUMENTATION*

## API

URL: https://onabooking-api.onrender.com/doc

## Technologies

- DATABASE (Mongo DB)
- Node JS
- NestJs Framework

Download NodeJs url: https://nodejs.org/en
Download MongoDb: https://www.mongodb.com/try/download/community
Install NestJS: https://docs.nestjs.com/

## Processes

- Download/Install Nodejs
- Download/Install MongoDB
- Clone API from GitHub
- Install NestJs
- Run npm run start:dev in the command line
- Go to connected port on a browser

## ENDPOINTS

>USERS
 Get all User: /api/v1/users

>AUTH
 Register User: /api/v1/auth/register
 Login User: /api/v1/auth/login
 
>BOOKING
 User makes booking: POST /api/v1/bookings
 User gets booking: GET /api/v1/bookings
 User updates booking: PATCH /api/v1/bookings/:id
 User deletes booking: DELETE /api/v1/bookings/:id
 
>PROPERTY
 Admin creates property along with their images: POST /api/v1/properties
 Users gets properties with images: GET /api/v1/properties
 Admin updates properties: PATCH /api/v1/properties/:id
 Admin deletes property: DELETE /api/v1/properties/:id

## FRONT END

BACKEND API URL: https://onabooking-api.onrender.com/doc (This takes a while to come up due to inactivity, 60 secs max)

## Technologies

- HTML, CSS
- JAVASCRIPT FETCH API

## Processes

- Register with the register page
- Login with the login page
- Get all properties through the index page
- Book on the single hotel page

## Missing Pages

- Create property (All properties created where done on the APi level)
- Update property
- Delete property
- Edit Booking
- Delete Booking