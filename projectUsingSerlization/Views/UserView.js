//simple class which is used for view
//result is passed through the constructor 
//set the value in the objct
class UserView {
  constructor(userObj) {
    this.userId = userObj.id;
    this.userName = userObj.name;
    this.userEmail = userObj.email;
    this.userPassword = userObj.password;
  }
}
//in the mutiple data it required to loop 
class UserListView {
  constructor(userObj) {
    this.userList = [];
    for (let user of userObj) {
      console.log(user);
      this.userList.push(new UserView(user));
    }
  }
}

class LoginView {
  constructor(data, accessToken, refreshToken) {
    this.user_id = data.user_id;
    this.user_name = data.name;
    this.email = data.email;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

module.exports = { UserView, UserListView,LoginView };
