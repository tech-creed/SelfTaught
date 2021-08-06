const CryptoJS = require("crypto-js");
const User = require('../models/authModel');
const mailer = require("nodemailer");

const login = (req,res)=>{
   
    User.find({"username":req.body.user_name},function(err,docs){
        if(docs.length === 0){
           
            return res.send({"message":"user not found"})
            
        }
        else{
            let found = false
            docs.forEach((d)=>{
            
                var decrypted_password = CryptoJS.AES.decrypt(d.password,"techcreed").toString(CryptoJS.enc.Utf8)
                if(req.body.password === decrypted_password){
                    found = true
                    res.send({id:d["_id"]})
                }
              
            })
            if(!found){
                res.send({'message':'wrong password'})
            
            }
           
           

        }

    })
   
}
const signup = (req,res)=>{
    var password = CryptoJS.AES.encrypt(req.body.password,"techcreed")
    var code = Math.floor(100000 + Math.random() * 900000);
   
    User.find({"fullname":req.body.fullname,"email":req.body.email},function(err,docs){
        if(err){
            console.log(err)
        }
        else{
            if(docs.length === 0){
                const newUser = new User({
                    fullname:req.body.fullname,
                    password:password,
                    email:req.body.email
                })
                newUser.save().then((result=>{
                    let transporter = mailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: "techcreed.tech@gmail.com",
                            pass: "devOps@dark"
                        }
                    });
                    let mailoption = {
                        to: result["email"],
                        subject: 'SelfTaught - Verification Code',
                        html:"<p>Veification code - "+String(code)+" This is system generated mail.Don't respond it</p>"
                        
                    };
                    transporter.sendMail(mailoption, (error, info) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(info.response)
                        }
                    })
                    res.send({uid:result["_id"],verificationCode:code})
                }))
                .catch(err=>console.log(err))
            }
            else{
                res.send({message:'user already found'})
            }
        }
    })
    
        
    
       
}
module.exports = {
    login,
    signup
}