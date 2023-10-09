const Comment = require("../models/comment");
const User = require("../models/user");

const create = async(req, res, next)=> {
    try{
        const user_id = req.id
        const {id} = req.params;
        const {text} = req.body;
        const book_id = id

        const comment = await Comment.create({text,user_id, book_id });
        comment.save()
        res.json({message:"Ok", comment});

    } catch(error){

    }
};

const find = async (req, res) => {
    
    const comment = await Comment.findAll({include:User});
    res.json({comment});
  };
  

module.exports = {create, find}