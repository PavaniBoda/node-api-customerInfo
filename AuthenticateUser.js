const userData = {
  "user_id": "admin123",
  "password": "admin123"
};
function isauthenticate(user,pwd) {
    
   
    // return 400 status if username/password is not exist
   console.log(user,pwd)
    if (!user || !pwd) {
      return {
        success: true,
        //isUserAuthenticated: undefined,
        content: "Please enter login credentials to continue"
      };
    }
    // return 401 status if the credential is not match.
  else if (user !== userData.user_id || pwd !== userData.password) {
    return {
        success: true,
        isUserAuthenticated: false,
        content: "Username or Password is Wrong."
    };
  }
  else {
    return {
      success: true,
      isUserAuthenticated: true,
      customerid: "IJ101"
    };
  }
}

module.exports = {
    isauthenticate
  }