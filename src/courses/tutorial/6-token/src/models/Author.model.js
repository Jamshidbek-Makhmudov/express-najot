class Author {
  constructor(id, firstName, lastName, birthDate, deadDate = null, country, bio, photo) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.deadDate = deadDate;
    this.country = country;
    this.bio = bio;
    this.photo = photo;
  }
}

module.exports = Author;
