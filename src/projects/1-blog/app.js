
let c=1;
const express = require("express");
const app = express();
const Io = require("./utils/Io");
const Todo = require("./utils/todo");
const todo = new Todo("./database/blogs.json");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
//app.use(cors({origin:"http://127.0.0.1:5500/indeh.html"}))

app.get("/blog", async(req, res)=>{
    const data = await todo.read();
    res.json({data});
})

app.post("/blog", async(req, res)=>{
    const {title, description} = req.body;

    if(!title|| !description)
        return res.status(400).json({message:"Title and Description is required"});


    const data = await todo.read();
    const id = (data[data.length-1]?.id||0) + 1;
   

    const newIo = new Io(id, title, description);

    const newData = data.length? [...data, newIo]: [newIo];

    await todo.write(newData);
    res.status(201).json("Successfully Created");
});

app.put("/blog/:id", async (req, res)=>{
    const {id} = req.params;
    const {title, description} = req.body;

    const data = await todo.read();
    const  findTodo = data.filter((item)=>item.id == id);

    if(!findTodo[0]) {
        return res.status(404).json({massage: "Todo not fount"});
        
    }

    findTodo[0].title=title ? title : findTodo.title;
    findTodo[0].description=description ? description : findTodo.description;
    
    await todo.write(data);
    res.json({message:"Successfully Updated"});

})

app.delete("/blog/:id", async (req, res)=>{
    const {id} = req.params;
    const data = await todo.read();
    const find = data.filter((item)=>item.id != id);
    await todo.write(find);
    res.json({message:"Successfully Deleted"});

})

app.get("/blog/:id", async(req, res)=>{
    const {id} = req.params;
    const data = await todo.read();

    const find = data.filter((item)=>item.id == id);
    
    ++c;
    find.forEach(element => {
        element.view+=c;
    });
    res.json(data);
    await todo.write(data);
    c=0;
})


app.listen(4000, ()=>{
    console.log("Server is listening: 4000");
})