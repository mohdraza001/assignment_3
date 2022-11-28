const express=require('express');
const cookieParser= require("cookie-parser");
const sessions= require('express-session');
const userrouter =express.Router();
userrouter.use(express.json());
userrouter.use(express.urlencoded({ extended: true }));
const {login,regist}=require('../controller/usercon')
userrouter.use(cookieParser());
const oneDay = 1000 * 60;
userrouter.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
userrouter.get("/",(req,res)=>{
    res.render("user");
})
userrouter.get("/login",(req,res)=>{
   
    res.render("login");
})
userrouter.get("/regis",(req,res)=>{
   
    res.render("regis");
})
userrouter.get("/welcome/:id",(req,res)=>{
   let email=req.params.id;
    res.render("welcome",{email:email});
})
userrouter.post("/postdata",regist);
userrouter.post("/logindata",login);
// (req,res)=>{
//     session=req.session;
// });
userrouter.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        res.clearCookie('connect.sid');
        res.redirect('/') // will always fire after session is destroyed
      })
});

module.exports=userrouter;