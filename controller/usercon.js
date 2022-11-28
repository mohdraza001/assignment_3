const fs=require('fs');
var lineReader = require('line-reader');
const { exit } = require('process');
const regist=((req,res)=>{
    let {name,email,city,age,pswd}=req.body;
    if(fs.existsSync(`./user/${email}.txt`)){
        res.render('regis',{errMsg:'Email Already registered'})
    }
    else{
        fs.writeFileSync(`./user/${email}.txt`,`${pswd},${name},${email},${age},${city}`)
        
        session=req.session;
        res.redirect("/user/welcome/"+email);
    }
   
})
const login=((req,res)=>{
    let {email,password}=req.body;
    if(fs.existsSync(`./user/${email}.txt`)){
        let data=fs.readFileSync(`./user/${email}.txt`);
         var pass=password.toString();
             let data1=data.toString();
             var readdata=data1.split(",");
             if(readdata[0]===pass){
                session=req.session;
                res.render("welcomeback",{email:email});
             }
             else{
                  res.render("login",{errMsg:'Enter a Correct Password'})
             }
    }
    else{
        res.render("login",{errMsg:'Enter a Correct Email address or Register your Mail'})
    }
})
module.exports={
    regist,
    login
}