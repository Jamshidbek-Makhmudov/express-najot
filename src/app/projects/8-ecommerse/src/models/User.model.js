class User {
  constructor(id, firstName, lastName, phoneNumber, password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.isAdmin = false;
  }
}

module.exports = User;
