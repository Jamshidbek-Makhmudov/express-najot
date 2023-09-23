const { Op } = require('sequelize');
const TaskManager = require('../models/task-manager');
const sequelize = require('../database');

const find = async (req, res) => { 
	const { search } = req.query;

	const filter = {};

	//if (search) filter.title=search;  //bu birga b ir qidirish

//bu 1ta rowdan qidirsh
	// if (search) {
	// 	filter.title = {
	// 		[Op.iLike]:`%${search}%`,
	// 	};

	// }

	
	//bu har ikala rowdan qidirish
	if (search) { 
		filter.where = {
			[Op.or]: {
				title: {
					[Op.iLike]:`%${search}`,
				},
				description: {
					[Op.iLike]:`%${search}`,

				}
			}

		}
	}

	const data = await TaskManager.findAll({ where: filter });

	


	res.json({ message: "Success", data })
	
};

const create = async (req, res) => { 
	const { title, description } = req.body;

	//transaction:
	const trx=await sequelize.transaction();

	try {
		const data = await TaskManager.create({ title, description }, {transaction:trx});
		await data.save();
	
		await trx.commit();

		res.json({ message: "Success", data })
		
		
	} catch (error) {
		await trx.rollback();
		res.status(500).json({ message: "Error" })
		
	}

};

const findBy = async (req, res) => { 
	const { id } = req.params;
	
	const data = await TaskManager.findByPk(id)
	


	res.json({message:"Success", data})
}
const findOne = async (req, res) => { 
	const { id } = req.params;
	
	const data = await TaskManager.findOne( {id})
	

	res.json({message:"Success", data})
}

const findAll = async (req, res) => { 

	
		const data = await TaskManager.findAll()
	res.json({ data })
}

const update = async (req, res) => { 
	const { id } = req.params;
	const {title, description } = req.body;
	const [,data] = await TaskManager.update({ title, description }, { where: { id },returning:"*" });


	res.json({data,message:"Success"})

}


const remove = async (req, res) => { 
	const { id } = req.params;

	const data = await TaskManager.destroy({ where: { id } });

	res.json({message:"Success"})

	

}

module.exports = {find, create, findBy, findOne, findAll,update,remove}