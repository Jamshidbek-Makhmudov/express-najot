const { isValidObjectId } = require("mongoose");
const Todos = require("../models/todos");

const create = async (req, res) => {
  try {
    const { title, description, status,author } = req.body;
    
// mongo dbda 2 xil yol bilan create qilsa boladi: 
//birinchisi const newTodo = await Todos.create({title: title, description: description, status: status});
    
 //ikkkinchisi new object qilib:
    const newTodo = new Todos({title, description, status, author});
    await newTodo.save();

    res.status(201).json({message: "Success", newTodo});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};
const find = async (req, res) => {
  try {
  
    const { title } = req.query;
    //filterlab qidirsh
    const filter = {};

    if (title) {
      filter.title = title;
    }
    //... qilib davom ettirsh mumkin filterda b asosan online maganizlarda fiterlashda ishlatilinadi koplab filterlarni bersa boladi if ichida
/*

between ishlatish:
$lte-less than or equal
$gte-greater than or equal
$lt-less than 
$gt-greater than 
 hihlasa 2ta xoxlasa 1ta qiymat bersa boladi vergul bilan:

    const data = await Todos.find({createdAt:{$lte:new Date(2023-09-23T05:56:00.743Z)}})

sort qilish:
 asc yoki desc qilib sort qilish uchun ozini methodi bor

    const data = await Todos.find().sort({title:"desc","description:"desc})

birga bir search qilish

  const data = await Todos.find({title});

  //search qilish: 

  const data = await Todos.find({title:{$regex:title, $options:"i"}});

  //offset mongdb skipga yeng limit esa ozi bor:
  skip nechtani otqazvorish
  limit - nechtani olish 
  va bular paginationda ishlatilinadi

  const data = await Todos.find().skip(1).limit(1);
    */

    const data = await Todos.find().populate("author");

    res.json({message: "Success", data});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};
const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) { 
      return res.status(400).json({ message: "invalid id" })
    }

    /*const data = await Todos.findById(id).select("-__v"); // mongoose daqaysi rowni olmaslik kerak bolsa . select()
ni ichida berib ketsa boladi. bunda oldiga minus qoyib oysa minusadan keyingilarni tashlab ketib qolganini olib ber degani mius qoysdan shunchaki yozib ketsa qaysilarini olib berish kerakligini bildiradi
*/
    const data = await Todos.findById(id).populate("author");


   // const data = await Todos.findById(id);

    res.json({message: "Success", data});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};
const update = async (req, res) => {
  try {
    const {id} = req.params;
    const {title, description} = req.body;
/* update ni ham ikki xil yoli bor findByIdAndUpdate() ni ichida id va update bolishi kere bogan datalarni berib yuboramiz object shaklida agar ularni oldidan $set:{title,description} qilib bersak qolgan yozmaganlarimiz ozgarmasdan qoladi
    const data = await Todos.findByIdAndUpdate(id, {
      $set:{title,
      description,
      },
    });

    yangilanga versiyasi xozircha $set bermasa ham boladi
 */
    const data = await Todos.findByIdAndUpdate(id, {
      title,
      description,
    });

    res.json({message: "Success", data});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};
const remove = async (req, res) => {
  try {
    const {id} = req.params;

    await Todos.findByIdAndDelete(id);

    res.json({message: "OK"});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};

module.exports = {
  create,
  find,
  findOne,
  update,
  remove,
};
