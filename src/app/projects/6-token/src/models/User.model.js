class User {
  constructor(
    id,
    firstName,
    lastName,
    phoneNumber,
    password,
    email,
    photo = null
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.email = email;
    this.photo = photo;
  }
}

module.exports = User;
