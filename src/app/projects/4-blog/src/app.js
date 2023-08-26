//require
require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
//import
const { createUser, getAllUsers, getOneUser } = require('../../../../controllers/user');
const { createChannel, getAllChannels, getOneChannel } = require('../../../../controllers/channel');
const { createPost, getAllPosts, getOnePost } = require('../../../../controllers/post');
const {
	createComment,
	getAllComments,
	getOneComment,
	deleteOneComment,
} = require('../../../../controllers/comment');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(process.cwd() + '/uploads'));
// app.use("/uploads",express.static(process.cwd() + "/uploads"));

const PORT = process.env.PORT || 6000;

// USER
app.post('/user', createUser);
app.get('/user', getAllUsers);
app.get('/user/:id', getOneUser);

// CHANNEL
app.post('/channel', createChannel);
app.get('/channel', getAllChannels);
app.get('/channel/:id', getOneChannel);

// POST
app.post('/post', createPost);
app.get('/post', getAllPosts);
app.get('/post/:id', getOnePost);

// COMMENT
app.post('/comment', createComment);
app.get('/comment', getAllComments);
app.get('/comment/:id', getOneComment);
app.delete('/comment/:id', deleteOneComment);

app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});
