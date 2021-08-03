const express=require('express')
const CryptoJS = require("crypto-js");
const MongoClient = require('mongodb').MongoClient

const app=express()
const cors = require('CORS')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

MongoClient.connect('mongodb+srv://ranjith:ranvi40700@cluster0.cspef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
  .then(client=>{
      const db = client.db('db')
      const user = db.collection('users')
      app.post('/login',(req,res)=>{
        
        user.find({"user_name":req.body.user_name}).toArray().then((doc)=>{
            if(doc.length === 0){
               
                return res.send({"message":"user not found"})
                
            }
            else{
                doc.forEach((d)=>{
                
                    var decrypted_password = CryptoJS.AES.decrypt(d.password,"techcreed").toString(CryptoJS.enc.Utf8)
                    if(req.body.password === decrypted_password){
                        res.send({id:d["_id"]})
                    }
                  
                })
               

            }
           
        })

           
    })
    app.post('/signin',(req,res)=>{
        var password = CryptoJS.AES.encrypt(req.body.password,"techcreed")
       //var a=CryptoJS.AES.decrypt(req.body.password,"techcreed").toString(CryptoJS.enc.Utf8)
        console.log(password.toString())
        user.find({"user_name":req.body.user_name,"full_name":req.body.full_name,"email":req.body.email}).toArray().then((doc)=>{
            if(doc.length === 0){
                user.insertOne({...req.body,password:password.toString()}).then(idoc=>{
                    return res.send({"id":idoc})
                })
            }
            else{
                doc.forEach((d)=>{
                
                    var decrypted_password = CryptoJS.AES.decrypt(d.password,"techcreed").toString(CryptoJS.enc.Utf8)
                    if(req.body.password === decrypted_password){
                        res.send({message:'user already found'})
                    }
                    else{
                        user.insertOne({...req.body,password:password.toString()}).then(idoc=>{
                            return res.send({"id":idoc})
                        })
                    }
                })
               

            }
           
        })
        
           
    })
  })



app.listen(process.env.port || 4000,function(){
     console.log("listening..");
});

