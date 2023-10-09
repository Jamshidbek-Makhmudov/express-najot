const {v4: uuid} = require("uuid");

class Send{
    constructor(sendID, message,type, userId){
        this.id = uuid();
        this.sendID = sendID;
        this.message = message;
        this.type = type;
        this.userId = userId;
    }
}

module.exports = Send;