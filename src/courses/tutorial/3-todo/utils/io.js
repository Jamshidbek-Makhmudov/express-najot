const fs = require('fs').promises; //fs katta projectlarda ishlatilmaydi

class Io {
	#dir;
	constructor(dir) {
		this.#dir = dir;
	}
	async read() {
		const data = await fs.readFile(this.#dir, 'utf-8');
		return data.length ? JSON.parse(data) : [];
	}
	async write(data) {
		await fs.writeFile(this.#dir, JSON.stringify(data, null, 2), 'utf-8');
	}
}

module.exports = Io;

//bu yerda #dir  dir ni private qilib qoyadi. bunday qilinishini sababi- dir ni private qilmasa
//tashqaridan
//const newFile= new Io("./io.js");
//ins.dir="..app.js"
//qilib ozgartirib qoysa boladi, #- private qilishi shuni oldini oladi
