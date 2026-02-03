const express=require('express')
const router=express.Router()

const db=require('../utils/db')
const result=require('../utils/result')
const bcrypt=require("bcrypt")
const config=require('../utils/config')
const jwt=require('jsonwebtoken')


//Signin as customer
router.post('/signin', (req, res) => {
    const { email, password } = req.body;
  
    const sql = `SELECT * FROM customer WHERE email=?`;
  
    db.query(sql, [email], (err, data) => {
      if (err) {
        return res.status(500).send(result.createResult(err));
      }
  
      if (data.length === 0) {
        return res.status(404).send(result.createResult("User not found"));
      }
  
      // Compare password
      bcrypt.compare(password, data[0].password, (err, passwordStatus) => {
        if (err) {
          return res.status(500).send(result.createResult(err));
        }
  
        if (!passwordStatus) {
            return res.status(401).send(result.createResult("Invalid Password"))
        }
  
        // Success → create token and send response
        const payload = {
          customer_id: data[0].customer_id,
        };
  
        const token = jwt.sign(payload, config.SECRET);
  
        const user = {
          token,
          role: "customer",
          name: data[0].name,
          email: data[0].email,
          phone: data[0].phone,
          address: data[0].address,
        };
  
        return res.status(200).send(result.createResult(null, user));
      });
    });
  });
  


//Customer signup
router.post('/signup',(req,res)=>{
    const{name,email,password,phone,address}=req.body
    const sql=`Select * from customer WHERE email=?`
    db.query(sql,[email],(err,result)=>{
        if(err) 
            return res.status(500).json("Database error")
        if(result.length>0){
            return res.status(400).json("Email already exists")
        }
        bcrypt.hash(password,10,(err,hashedPassword)=>{
            if(err)
                return res.status(500).json("Password Hashing Failed")

            const sql=`Insert into customer(name,email,password,phone,address) values(?,?,?,?,?)`
            db.query(sql,[name,email,hashedPassword,phone,address],(err,data)=>{
                if(err)
                   return res.status(500).json("Signup Failed")
                return res.status(200).send('Signup Successful')
            })
        })
    })
})

//Displaying orders of particular customer
router.get('/orders',(req,res)=>{
    const customer_id=req.customer_id
    const sql=`Select order_id,order_date,total_amount,status FROM orders WHERE customer_id=?`
    db.query(sql,[customer_id],(err,data)=>{
       return res.send(result.createResult(err,data))
    })
})

module.exports=router