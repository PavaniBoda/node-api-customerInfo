require('dotenv').config();
 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./utils');
const authenticateUser = require('./AuthenticateUser');
const RetrieveUserDetails = require('./RetrieveUserDetails');
const TeamList = require('./TeamList');
 
const app = express();
const port = process.env.PORT || 4000;

// static user details
/*const userData = {
    "user_id": "admin123",
    "password": "admin123"
  };*/

// enable CORS
app.use(cors({'origin': '*'}));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['authorization'];
    if (!token) return next(); //if no token, continue
   
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) {
        return res.status(401).json({
          success: true,
          content: "Invalid user."
        });
      } else {
        req.user = user; //set the user to req so other routes can use it
        next();
      }
    });
  });
 
// request handlers
app.get('/', (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, content: 'Invalid user to access it.' });
    res.send('Welcome to the Node.js Tutorial! - ' + req.user.user_id);
});

app.get('/team', function (req, res) {  
  var teamMembers = TeamList.getTeamMembers();
  return res.status(200).json(teamMembers);
}); 

// validate the user credentials
app.post('/users/signin', function(req,res){
  //console.log(req);
  var authenticationStatus = authenticateUser.isauthenticate(req.body.user_id,req.body.password);
  console.log("Test "+authenticationStatus);
  if(authenticationStatus.isUserAuthenticated) {
    return res.status(200).json(authenticationStatus);
  }
  else if(authenticationStatus.isUserAuthenticated == undefined) {
    return res.status(400).json(authenticationStatus);
  }
  else {
    return res.status(401).json(authenticationStatus);
  }
});

app.post('/customerDetails',function(req,res) {
  var customerDetails = RetrieveUserDetails.retrieveUserDetails(req.body.customerid);
  if(customerDetails.success) {
    return res.status(200).json(customerDetails);
  }
  else {
    return res.status(400).json(customerDetails);
  }
})

app.listen(port, () => {
  console.log('Server started on: ' + port);
});
