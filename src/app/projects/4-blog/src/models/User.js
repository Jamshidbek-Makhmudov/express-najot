class User {
  constructor(id, fullName, phoneNumber, bio, username, photo) {
    this.id = id;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.bio = bio;
    this.username = username;
    this.photo = photo;
    this.createdAt = new Date();
  }
}

module.exports = User;
