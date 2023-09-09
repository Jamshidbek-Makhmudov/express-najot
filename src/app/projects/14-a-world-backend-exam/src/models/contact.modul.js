class Contact{
    constructor(id, name, phoneNumber, email, message){
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.message = message;
        this.status = false
    }
}

module.exports = Contact;