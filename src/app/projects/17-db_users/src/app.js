const express = require("express");
const fetchAll = require("./connection");
//multer
const upload=require('./middleware/multer')

const app = express();
app.use(express.json())

//distrubtizatsiya qilish
const data = {
    row: [
        {"name": "John", "email": "xxx@xxx.xxx.xxx"},
        {"name2": "John2", "email2": "xxx@xxx.xxx.xxx2"},
        {"name3": "John3", "email3": "xxx@xxx.xxx.xxx3"},
]};
const { row} = {
    row: [
        {"name": "John", "email": "xxx@xxx.xxx.xxx"},
        {"name2": "John2", "email2": "xxx@xxx.xxx.xxx2"},
        {"name3": "John3", "email3": "xxx@xxx.xxx.xxx3"},
]};
const { row: [y]} = { //ikki nuqta qayta nomlab olish uchun kerak y ni row qilib qayta nomlab oladi
    row: [
        {"name": "John", "email": "xxx@xxx.xxx.xxx"},
        {"name2": "John2", "email2": "xxx@xxx.xxx.xxx2"},
        {"name3": "John3", "email3": "xxx@xxx.xxx.xxx3"},
]};
const { row: [{ name}]} = {
    row: [
        {"name": "John", "email": "xxx@xxx.xxx.xxx"},
        {"name2": "John2", "email2": "xxx@xxx.xxx.xxx2"},
        {"name3": "John3", "email3": "xxx@xxx.xxx.xxx3"},
]};
app.get('/users', async (req, res)=>{
    const users = await fetchAll('select * from users');

    //console.log(name);
    console.log(users);
     
   res.send(users);
});


app.get('/users/:userId', async (req, res)=>{
    const {userId} = req.params
    const users = await fetchAll('select * from users WHERE id= $1', [userId]); //bu yerda paramni alohida yozib id=$1 qilib ketishining sababi sql injection bolmasligi uvhun
    if(!users){
        res.status(404).send({message:"user not found", status:404});
        return;
    }
    //  console.log(users);
    res.send(users);
    return;
});


app.post('/users', async (req, res)=>{
    const {username, password} = req.body;
    const users = await fetchAll('INSERT INTO users(username, password) VALUES($1, $2) returning *;', [username, password]);
    res.send(users);
});

//file uploads with multer
//for multiple uploads: upload.array()
//const {filenaame}=req.files


let fileUpload=upload.single('avatar')
// app.post("/create/users", async (req, res) => { 
//     fileUpload(req, res, function (err) {
//         console.log(err);
//         res.send({status:400,message:'bad request'})
        
//     })
//     const { filename } = req.file;
//     const { firstname, lastname } = req.body;
//     const users = await fetchAll('INSERT INTO users(firstname, lastname, image) VALUES($1, $2, $3) returning *', [firstname, lastname, filename]);

//     console.log(users);
    
    
//     res.status(201).send({success:true,status:201,data:users});

    

// })

//yuklash 
app.post("/create/users", upload.single('avatar'), async(req, res) => { 
    const { filename } = req.file;
    const { firstname, lastname } = req.body;
    const users = await fetchAll('INSERT INTO users(firstname, lastname, image) VALUES($1, $2, $3) returning *', [firstname, lastname, filename]);

    console.log(users);
    
    
    res.status(201).send({success:true,status:201,data:users});

    

})








app.put('/users/:userId', async (req, res)=>{
    const {userId} = req.params
    const {username} = req.body
    const users = await fetchAll('UPDATE  users SET username= $1 WHERE id =$2 returning *;', [username,userId]);
    res.send(users);
});

app.delete('/users/:userId', async (req, res)=>{
    const {userId} = req.params
    const users = await fetchAll('DELETE FROM users WHERE id = $1 returning *', [userId]);
    res.send(users);
});




app.listen(4000, ()=>{
    console.log(4000);
})