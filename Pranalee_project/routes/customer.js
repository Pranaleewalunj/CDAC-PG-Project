const express=require("express")
const router=express.Router();
const db=require("../utils/db");
const result=require("../utils/result")
const authCustomer=require('../utils/authCustomer')

//Get all customer data
router.get('/',(req,res)=>{
    const sql="Select * from customer"
    db.query(sql,(err,data)=>{
        if(err)
           return res.status(500).send("Database Error")
        if(data.length===0)
            return res.status(200).send("No Customers Found")
        return res.status(200).json(data)
    })
})

//Get profile - Details of the customer
router.get('/profile', authCustomer, (req, res) => {
    const sql = `
      SELECT name, email, phone, address
      FROM customer
      WHERE customer_id = ?
    `
    db.query(sql, [req.customer_id], (err, data) => {
      if (err) {
        return res.status(500).json(result.createResult(err))
      }
      if (data.length === 0) {
        return res.status(404).json(result.createResult("Customer not found"))
      }
      return res.json(result.createResult(null, data[0]))
    })
  })
  
  
// Update phone and address
router.put('/profile', (req, res) => {
    const { address, phone } = req.body

    if(!address || !phone){
        return res.status(400).json({ status: "error", error: "Missing fields" })
    }

    const sql = "UPDATE customer SET phone=?, address=? WHERE customer_id=?"
    db.query(sql, [phone, address, req.customer_id], (err, result) => {
        if(err) return res.status(500).json({ status: "error", error: "Database error" })
        if(result.affectedRows === 0) return res.status(404).json({ status: "error", error: "Customer not found" })

        return res.json({ status: "success", message: "Profile updated successfully" })
    })
})

//Update phone of customer
router.patch('/updatephone',(req,res)=>{
    const {customer_id,phone}=req.body
    const sql=`Update customer SET phone=? WHERE customer_id=?`
    db.query(sql,[phone,customer_id],(err,result)=>{
        if(err)
           return res.status(500).send('Database Error')
        if(result.affectedRows===0)
           return res.status(404).send('Customer not Found')
        return res.status(200).send('Phone number updated')
    })
})

//Update email of customer
router.patch('/updateemail',(req,res)=>{
    const {customer_id,email}=req.body
    const sql=`Update customer SET email=? WHERE customer_id=?`
    db.query(sql,[email,customer_id],(err,result)=>{
        if(err)
           return res.status(500).send('Database Error')
        if(result.affectedRows===0)
           return res.status(404).send('Customer not Found')
        return res.status(200).send('Email updated')
    })
})





module.exports=router;