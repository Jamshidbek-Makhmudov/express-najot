class Channel {
  constructor(id, name, username, description, photo, owner) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.description = description;
    this.photo = photo;
    this.owner = owner;
  }
}

module.exports = Channel;
