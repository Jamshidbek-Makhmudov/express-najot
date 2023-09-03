class Join{
    constructor(name, group, message){
        this.name = name;
        this.group = group;
        this.message = message
        this.createAt = new Date();
    }
}

module.exports = Join;