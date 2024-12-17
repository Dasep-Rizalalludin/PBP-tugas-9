const express = require("express");
const app = express();
const db = require("./db")
const {validationResult} = require("express-validator")
const registerValidation = require("./regis");
const loginValidation =  require("./login")


app.use(express.json());
app.post("/register",registerValidation,(req,res) =>{
    const{email,username,password} = req.body
    const result = validationResult(req)
    if(!result.isEmpty()){
        return res.status(400).json({validationMessage:result.array().map((err)=>({
            message:err.msg
        }))})
    }
    db.query("INSERT INTO akun (email,username,password) VALUES(?,?,?) ", [email,username,password])
    res.status(201).json({pesan:"Berhasil Regist"})
})

app.post("/login",loginValidation,(req,res)=>{
    const{email} = req.body
    const result = validationResult(req)
    if(!result.isEmpty()){
        return res.status(400).json({validationMessage:result.array().map((err)=>({
            message:err.msg
        }))})
    }
    db.query("SELECT * FROM akun WHERE email = ?",[email],(err,result)=>{
        if(err) throw err
        if (result.length == 0){
            return res.status(400).json({pesam:"email blum ada,silahkan daftar"})    
        }
        res.status(200).json({pesan:"Berhasil Login"})
    })

    
})





app.listen(3000,()=>{
    console.log("listen to 3000")
}) 