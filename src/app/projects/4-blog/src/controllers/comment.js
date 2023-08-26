const Io = require("../utils/Io");
//const path = require("path")
const {get} = require("../utils/get");
const Comment = require("../models/Comment");

const Comments = new Io(process.cwd()+"/database/comments.json");
const Posts = new Io(process.cwd() + "/database/posts.json")


const createComment = async (req, res) => {
  const {text, author, post} = req.body;
  const comments = await get(Comments);
  const id = (comments[comments.length-1]?. id || 0) +1;
  const newComment = new Comment(id, text, author, post );
  const result = comments.length? [...comments, newComment] : [newComment];

  await Comments.write(result);
  res.json({message:"Successfully Created"});
};


const getAllComments = async (req, res) => {
  const comments = await get(Comments)
  const posts = await get(Posts);

  const find = comments.map((item)=>{
    item.post = posts.find((post)=>post.title==item.post)
    return item;
  })

  res.json(find)

};
const getOneComment = async (req, res) => {
  const {id} = req.params;

  const comments = await get(Comments);
  const posts = await get(Posts);

  const find = comments.find((item)=>item.id==id);

  if(!find) return res.status(404).json({message:"Not found comment"});

  find.post = posts.find((item)=>item.title ==find.post);

  res.json(find)
  
};
const deleteOneComment = async (req, res) => {
  const {id} = req.params;
  const comments = await get(Comments);

  const find = comments.filter((item)=>item.id != id);
  
  res.json({message:"Successfully Deleted"});
  await Comments.write(find);
  
};

module.exports = {
  createComment,
  getAllComments,
  getOneComment,
  deleteOneComment,
};
