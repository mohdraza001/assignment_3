const express=require('express');
var hbs = require('hbs')
const  path=require('path');
const PORT=7777;
const app=express();
app.set('view engine','hbs');
app.set('views','view');
hbs.registerPartials(__dirname + '/view/partial');
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:false}));
// app.get("/",(req,res)=>{
//     res.render('index');
// })
let mainrouter=require('./routes/mainRoutes');
let userrouter=require('./routes/userRouter');
app.use("/",mainrouter);
app.use("/user",userrouter);
// app.use("*",(req,res)=>{
//     res.render("user");
// })
app.listen(PORT,(err)=>{
    if(err) throw err;
    else console.log(`Server work on ${PORT}`)
})