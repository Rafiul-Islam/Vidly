This is a MERN Stack movie rentel application where user can create and update movie list and only admin can delete the movie. This app contain the user authentication and authorization.

## Features
 - Add Movie with details
 - Edit Movie deatils
 - Delete Movie as admin
 - User authentication and authorization with JWT
 - Form validation
 - Error Notification with react-toastify
 
## Technology
 - React
 - React Router
 - Bootstarp
 - NodeJs
 - Mongodb
 - NPM (react-toastify, lodash, font-awesome, joi-browser, jwt-decode)
 
 ## Starterkit
 
### Get the kit
```
git clone https://github.com/Rafiul-Islam/Vidly
```
You need mongodb setup locally on your machine

Go to the `Server` folder in the main project folder
 
### Installation
 ```
 npm install
 ```
 Then,
 ```
 node seed.js
 ```
 After command execution
 ```
 node index.js
 ```
After this  starts a webserver with hot loading. Runs on `http://localhost:3900/`. You will find the intial data on this `http://localhost:3900/api/movies` and `http://localhost:3900/api/genres`
 
Then go back to the main project folder and open the `Client` folder and run the following command step by step

 ```
 npm install
 ```
 
Builds the application and starts a webserver with hot loading. Runs on `http://localhost:3000/`
 
 ```
 npm start
 ```
 
### App using procedure

Now you are visitor(non login) of the app. If you want to be an user then click on the `Register` tab and do registation after sign up you are an user. Now you can
edit movie and add movie . 

If you want to delete a movie you have to login as an admin. For this open to mongodb Compass and make and user to admin by adding on extra field to the user JSON 
`isAdmin: true`


 
 
