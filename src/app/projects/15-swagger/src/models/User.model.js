const { v4 } = require('uuid');
class User {
	constructor(firstName, lastName, userName, password, photo, age) {
		this.id = v4();
		this.firstName = firstName;
		this.lastName = lastName;
		this.userName = userName;
		this.password = password;
		this.photo = photo;
		this.age = age;
		this.isAdmin = false;
	}
}

module.exports = User;
