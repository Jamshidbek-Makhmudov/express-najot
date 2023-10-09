const Joi = require("joi");
const Book = require("../models/book");
const CustomError = require("../utils/custom-error");
const { Op } = require("sequelize");
const { search } = require("../routes/books.routes");
const Comment = require("../models/comment");

const create = async(req, res, next)=> {
    try{
        const {title, pages, year, price, country, author, description} = req.body;
        const photo = req.body.file

        const {error} = Joi.object({
            title:Joi.string().max(32).required(),
            pages:Joi.number().max(32).required(),
            price: Joi.number().required(),
            year: Joi.number().required(),
            country: Joi.string().required(),
            author:Joi.string().max(32).required(),
            description:Joi.string().max(64).required(),
            photo:Joi.required(),
          }).validate({
            title:title?.trim(),
            pages:pages?.trim(),
            price: price?.trim(),
            year: year?.trim(),
            country: country?.trim(),
            author:author?.trim(),
            description:description?.trim(),
            photo:photo?.trim(),
          });
      
        if (error) throw new CustomError(400, error.message);

        const books = await Book.create({title, pages, year, price, country, author, description, photo});
        books.save();
        
        res.json({message: "OK", books });
      
    }catch(error){
        next(error)
    }
}

const findAll = async(req, res, next)=> {
    try{
        const books = await Book.findAll();

        res.json({message: "OK", books})
    }catch(error){
        next(error)
    }
};

const findOne = async(req, res, next)=> {
    try{
        const {id} = req.params;
        
        const books = await Book.findAll({
            where:{id}
        }, 
        {
            include:Comment,
           
        });

        res.json({message:"OK", books});
    }catch(error){
        next(error)
    }
};

module.exports = {create, findAll, findOne}