let c=0;
const Io = require("../utils/Io");
const path = require("path");
const {get} = require("../utils/get");
const Post = require("../models/Post");

const Posts = new Io(process.cwd()+"/database/posts.json");
const Channels = new Io(process.cwd()+"/database/channels.json");

const createPost = async (req, res) => {
  const {title, description, channel} = req.body;
  const photo = req.files?.photo;

  const posts = await get(Posts);

  const mimetype = path.extname(photo.name);
  const imageName = photo.md5 + "_" + Date.now() + mimetype;
  photo.mv(`${process.cwd()}/uploads/${imageName}`);
    


  const id = (posts[posts.length-1]?.id||0 )+1;

  const newPost = new Post(id,imageName, title, description, channel);
  const result = posts.length? [...posts, newPost]: [newPost];

  await Posts.write(result);
  res.json({message:"Successfully Created"});
  
};

const getAllPosts = async (req, res) => {
  const posts = await get(Posts);
  const channels = await get(Channels);

  const find = posts.map((item)=>{
    item.channel = channels.find((channel)=>channel.name == item.channel )
    return item;
  })

  res.json({posts:find});

};

const getOnePost = async (req, res) => {
  const {id} = req.params;
  const posts =await get(Posts);
  
  const channels = await get(Channels);
  const post = posts.filter((item)=>item.id ==id);

  
  if(!post) return res.status(404).json({message:"Post not found"});

  ++c;
  post.forEach(item=>{
    item.view+=c;
  })

  post.channel = channels.find((item)=>item.name == post.channel);
  
  res.json(post)
  await Posts.write(posts);
  c=0;

};

module.exports = {
  createPost,
  getAllPosts,
  getOnePost,
};
