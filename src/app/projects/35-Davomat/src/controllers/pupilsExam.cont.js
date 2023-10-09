const examModel = require("../models/exam.model");
const pupilsExamModel = require("../models/pupilsExam.model");
const {ballMark, time} = require("./ball.funct");

const exam = async(req, res, next) => {

    try{
        const file = req.body.file;
        const {id} = req.verify
        const {examName, exam_id} = req.body;
        
        if(file){
            const exams = await pupilsExamModel.create({photo:file,pupils_id:id, exam_id });
            
            res.json({message:"OK"});
            return 1;
        }else if(examName) {

            const exams =  await pupilsExamModel.create({examName, pupils_id:id, exam_id})
            res.json({message:"OK", exams});
            return 1;
        }else{
            res.json({message:"OK"})
        }
    }catch(error){
        console.log(error.message);
        next(error)
    }
};



const findAll = async(req, res, next) => {
    try{
        const pupils = await pupilsExamModel.find().populate("pupils_id");

        res.json({pupils});

    }catch(error){
        console.log(error.message);
        next(error)
    }
};


const findOne = async(req, res, next) => {
    try{
        const {id} = req.params;

        const pupil = await pupilsExamModel.findOne({pupils_id:id}).populate("pupils_id");
        
        res.json({pupil});

    }catch(error){
        console.log(error.message);
        next(error)
    }
};


const mark = async(req, res, next) => {
    try{
        const {pupils_id, ball, exam_id} = req.body;
        let pupils;
        let id = exam_id;
        let status;
        let texts;

        if(ball<=100 && ball>0 ){
            pupils  = await pupilsExamModel.findOneAndUpdate({pupils_id}, {ball:ball});
        }

        const exam = await examModel.findById(id);
        const endTime = exam.endTime;
        const createAt = pupils.createdAt;
        
      
        const result = time(endTime, createAt, ball);
        
        if(result!=ball){
            texts = "O'z vaqtidan kech topshirganingiz uchun ball kamaytirildi."
        }
        
        const mark = ballMark(result)
        if(mark>2){
            status = true; 
        } else if(mark==2){
            status = false;
        }

   
        console.log("result", result);

        const resultExam = await pupilsExamModel.findOneAndUpdate({pupils_id},
            {ball:result, mark:mark, status, text:texts});
        
        res.json({message:"Ok", resultExam});
        console.log(resultExam);


    }catch(error){
        console.log(error.message);
        next(error)
    }
};




module.exports = {findAll, findOne, mark, exam}