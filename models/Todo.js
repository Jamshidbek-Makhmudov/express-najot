class Todo {
	constructor(id, title, description) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.created_at = new Date();
	}
}
module.exports = Todo;
