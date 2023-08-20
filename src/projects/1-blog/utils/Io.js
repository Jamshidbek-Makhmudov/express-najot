class Io{
    constructor(id,title, description,views){
        this.id = id;
        this.title = title;
        this.description = description;
        this.views = views ;
        this.created = new Date();
    }
};

module.exports = Io;
