class Blog{
    constructor(id, title, photo,owner, description){
        this.id = id;
        this.title = title;
        this.view=0;
        this.photo = photo;
        this.description = description;
        this.owner = owner; 
        this.createdAt = new Date();
    }
}

module.exports = Blog;