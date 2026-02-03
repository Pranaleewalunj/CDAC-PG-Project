const express=require('express')
const router=express.Router()

const db=require('../utils/db')
const result=require('../utils/result')
const authorizeCustomer=require('../utils/authCustomer')

router.post('/add',authorizeCustomer, (req, res) => {
    const customer_id=req.customer_id
    const {items, total_amount } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
        return res.send(result.createResult(
            { message: "Order items are required" }
        ));
    }

    // Insert into orders table
    const orderSql = `
        INSERT INTO orders (customer_id, order_date, total_amount, status)
        VALUES (?, NOW(), ?, 'PLACED')
    `;

    db.query(orderSql, [customer_id, total_amount], (err, orderResult) => {
        if (err) {
            console.error("Order insert error:", err);
            return res.send(result.createResult(err));
        }

        const order_id = orderResult.insertId;

        // Prepare order_items values
        const values = items.map(item => [
            order_id,
            item.product_id,
            item.quantity,
            item.price
        ]);

        const itemSql = `
            INSERT INTO order_items (order_id, product_id, quantity, price)
            VALUES ?
        `;

        db.query(itemSql, [values], (err2) => {
            if (err2) {
                console.error("Order items insert error:", err2);
                return res.send(result.createResult(err2));
            }

            // Success response
           return res.send(result.createResult(null, {
                message: "Order placed successfully",
                order_id
            }));
        });
    });
});

router.get('/', authorizeCustomer, (req, res) => {
    const customer_id = req.customer_id
  
    const sql = `
      SELECT 
        o.order_id,
        o.order_date,
        o.total_amount,
        o.status,
        oi.product_id,
        oi.quantity,
        oi.price,
        p.name,
        p.image
      FROM orders o
      JOIN order_items oi ON o.order_id = oi.order_id
      JOIN product p ON oi.product_id = p.product_id
      WHERE o.customer_id = ?
      ORDER BY o.order_date DESC
    `
  
    db.query(sql, [customer_id], (err, rows) => {
      if (err) return res.send(result.createResult(err))
  
      // GROUP BY order_id
      const ordersMap = {}
  
      rows.forEach(row => {
        if (!ordersMap[row.order_id]) {
          ordersMap[row.order_id] = {
            order_id: row.order_id,
            order_date: row.order_date,
            total_amount: row.total_amount,
            status: row.status,
            items: []
          }
        }
  
        ordersMap[row.order_id].items.push({
          product_id: row.product_id,
          name: row.name,
          image: row.image,
          price: row.price,
          quantity: row.quantity
        })
      })
  
      res.send(result.createResult(null, Object.values(ordersMap)))
    })
  })
  
module.exports=router