const private = (req, res) => {
	res.status(200).json({ message: 'private' });
};
const public = (req, res) => {
	res.status(200).json({ message: 'public' });
};

module.exports = {
	private,
	public,
};
