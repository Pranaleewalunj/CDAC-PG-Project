const express=require('express')
const db=require('../utils/db')
const result=require('../utils/result')

const router=express.Router()

//Adding category (Admin)
router.post('/addCategory',(req,res)=>{
    const {category_id,category_name,description}=req.body
    const sql=`Insert into category(category_id,category_name,description) values(?,?,?)`    
    db.query(sql,[category_id,category_name,description],(err,data)=>{
        res.send(result.createResult(err,data))
    })
})

//Displaying all categories to admin
router.get('/',(req,res)=>{
    const sql=`Select * from category`
    db.query(sql,(err,data)=>{
        res.send(result.createResult(err,data))
    })
})

//displaying category by category_id
router.get('/getByCategory',(req,res)=>{
    const category_id=req.body.category_id
    const sql=`Select * from category WHERE category_id=?`
    db.query(sql,[category_id],(err,data)=>{
        if(err){
            res.status(500).send('DB Error')
        }
        else{
            res.send(result.createResult(null,data))
        }
    })
})

//Admin can update the category and it's description
router.put('/updateCategory',(req,res)=>{
    const {category_id,category_name,description}=req.body
    const sql=`Update category SET category_name=?,description=? WHERE category_id=?`
    db.query(sql,[category_name,description,category_id],(err,result)=>{
        if(err){
            res.status(500).send('DB Error1')
        }
        if(result.affectedRows===0){
            res.status(404).send('Category not found')
        }
        return res.status(200).send('Category updated successfully')
    })
})


router.delete('/deletebyid/:category_id',(req,res)=>{
    const category_id=req.params.category_id
    const sql=`delete from category where category_id=?`
    db.query(sql,[category_id],(err,result)=>{
        if(err){
           return res.status(500).send('DB Error')
        }
        if(result.affectedRows===0){
            return res.status(404).send('Category not found')
        }
        return res.status(200).send('Category deleted successfully')
    })
})

module.exports=router