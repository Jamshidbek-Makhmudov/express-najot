const {v4: uuid} = require("uuid");

class User{
    constructor( userId, first_name){
        this.id = uuid();
        this.userId = userId;
        this.first_name = first_name;
    }
}

module.exports = User;