const Io = require('../utils/Io');
const path = require('path');

const { get } = require('../utils/get');
const Channel = require('../models/Channel');

const Users = new Io(process.cwd() + '/database/users.json');
const Channels = new Io(process.cwd() + '/database/channels.json');

const createChannel = async (req, res) => {
	const { name, username, description, owner } = req.body;
	const photo = req.files?.photo;

	const users = await get(Users);
	const channels = await get(Channels);

	let findUser = users.find(user => user.username === username);
	const findChannel = channels.find(channel => channel.username === username);

	if (findUser || findChannel) return res.status(400).json({ message: 'Already exists' });

	const mimetype = path.extname(photo.name);
	const imageName = photo.md5 + '_' + Date.now() + mimetype;
	photo.mv(`${process.cwd()}/uploads/${imageName}`);

	const id = (channels[channels.length - 1]?.id || 0) + 1;

	const newChannel = new Channel(id, name, username, description, imageName, owner);

	const result = channels.length ? [...channels, newChannel] : [newChannel];

	await Channels.write(result);

	res.status(201).json({ message: 'CREATED' });
};

const getAllChannels = async (req, res) => {
	const channels = await get(Channels);
	const users = await get(Users);

	const find = channels.map(channel => {
		channel.owner = users.find(user => user.id == channel.owner);
		return channel; //2ta db ni birlashtirib chiqarish
	});

	res.json({ channels: find });
};
const getOneChannel = async (req, res) => {
	const { id } = req.params;

	const channels = await get(Channels);
	const users = await get(Users);

	const channel = channels.find(channel => channel.id == id);

	if (!channel) return res.status(404).json({ message: 'Channel Not Found' });

	channel.owner = users.find(user => user.id == channel.owner);

	res.json({ channel });
};

module.exports = {
	createChannel,
	getAllChannels,
	getOneChannel,
};
