class Post {
  constructor(id, photo, title, description, channel) {
    this.id = id;
    this.photo = photo;
    this.title = title;
    this.description = description;
    this.channel = channel;
    this.createdat =new Date();
  }
}

module.exports = Post;
