const express=require("express")
const router=express.Router();
const db=require("../utils/db")
const result=require("../utils/result")


//Admin signin is done with email,password

//Admin can see all the accounts
router.get('/',(req,res)=>{
    const sql=`Select * from admin`
    db.query(sql,(err,data)=>{
        if(err)
            return res.status(500).send('Database Error')
        if(data.length===0)
            return res.status(404).send('Admin account not found')
        return res.status(200).json(data)
    })
})

router.get('/profile', (req, res) => {
    const sql = `
      SELECT admin_id, name, email
      FROM admin
      WHERE admin_id = ?
    `
    db.query(sql, [req.admin_id], (err, data) => {
      if (err) return res.status(500).json(result.createResult(err))
      if (data.length === 0)
        return res.status(404).json(result.createResult("Admin not found"))
  
      res.json(result.createResult(null, data[0]))
    })
  })
  

//Update email of admin
router.put('/profile',(req,res)=>{
    const {name}=req.body
    const sql=`Update admin SET name=? WHERE admin_id=?`
    db.query(sql,[name,req.admin_id],(err,result)=>{
        if(err)
           return res.status(500).send('Database Error')
        if(result.affectedRows===0)
           return res.status(404).send('Record not found')
        return res.status(200).send('Record Updated Successfully')
    })
})


//For low stock Alerts
router.get('/dashboard/summary',(req,res)=>{
    const sql=`Select 
    (SELECT COUNT(*) from product) As totalProduct,
    (SELECT COUNT(*) from category) As totalCategory,
    (SELECT COUNT(*) from orders) As totalOrders,
    (SELECT COUNT(*) from product WHERE stock_quantity<=10) As lowStockAlerts`
    db.query(sql,(err,data)=>{
        return res.send(result.createResult(err,data))
    })
})

// router.get('/orders',(req,res)=>{
//     const sql=`Select order_id,customer_id,order_date,total_amount,status from orders`
//     db.query(sql,(err,data)=>{
//        return res.send(result.createResult(err,data))
//     })
// })

// ADMIN: Get order items by order_id
router.get('/orders/:order_id', (req, res) => {
    const { order_id } = req.params
  
    const sql = `
      SELECT
        p.product_id,
        p.name,
        p.image,
        oi.quantity,
        oi.price
      FROM order_items oi
      JOIN product p ON oi.product_id = p.product_id
      WHERE oi.order_id = ?
    `
  
    db.query(sql, [order_id], (err, data) => {
      res.send(result.createResult(err, data))
    })
  })
  
  // ADMIN: Get all orders
router.get('/orders', (req, res) => {
    const sql = `
      SELECT 
        o.order_id,
        o.order_date,
        o.total_amount,
        o.status,
        c.name AS customer_name,
        c.email
      FROM orders o
      JOIN customer c ON o.customer_id = c.customer_id
      ORDER BY o.order_date DESC
    `
  
    db.query(sql, (err, data) => {
      res.send(result.createResult(err, data))
    })
  })

  // ADMIN: Get order items by order_id
router.get('/orders/:order_id', (req, res) => {
    const { order_id } = req.params
  
    const sql = `
      SELECT
        p.product_id,
        p.name,
        p.image,
        oi.quantity,
        oi.price
      FROM order_items oi
      JOIN product p ON oi.product_id = p.product_id
      WHERE oi.order_id = ?
    `
  
    db.query(sql, [order_id], (err, data) => {
      res.send(result.createResult(err, data))
    })
  })
  
  // ADMIN: Update order status
router.put('/orders/status', (req, res) => {
    const { order_id, status } = req.body
  
    const sql = `UPDATE orders SET status=? WHERE order_id=?`
  
    db.query(sql, [status, order_id], (err, resultData) => {
      if (err) {
        return res.status(500).send(result.createResult(err))
      }
  
      if (resultData.affectedRows === 0) {
        return res.status(404).send('Order not found')
      }
  
      res.send(result.createResult(null, 'Order status updated'))
    })
  })
  
  // ADMIN: Get low stock products
router.get('/low-stock', (req, res) => {
  const sql = `
    SELECT 
      product_id,
      name,
      image,
      price,
      stock_quantity
    FROM product
    WHERE stock_quantity <= 10
    ORDER BY stock_quantity ASC
  `

  db.query(sql, (err, data) => {
    res.send(result.createResult(err, data))
  })
})

//Delete account of admin
router.delete('/',(req,res)=>{
    const {admin_id}=req.body
    const sql=`Delete from admin WHERE admin_id=?`
    db.query(sql,[admin_id],(err,result)=>{
        if(err)
            return res.status(500).send('Database Error')
        if(result.affectedRows===0)
            return res.status(404).send('Record not found')
        return res.status(200).send('Record Deleted Successfully')
    })
})
module.exports=router