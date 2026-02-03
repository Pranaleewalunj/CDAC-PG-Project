const express = require('express')
const router = express.Router()
const db = require('../utils/db')
const result = require('../utils/result')

const multer = require('multer')
const fs = require('fs')

const upload = multer({ dest: 'productimages/' })

//Only admin can add products 
router.post('/add', upload.single('image'), (req, res) => {
    const { category_id, name, description, price, stock_quantity } = req.body
    const imageName = req.file.filename + '.jpg'
    const oldPath = req.file.path
    
    const newPath = `productimages/${imageName}`

    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            return res.status(500).send('Image saving failed')
        }
        const sql = `
            INSERT INTO product
            (category_id, name, description, price, stock_quantity, image)
            VALUES (?, ?, ?, ?, ?, ?)`
        db.query(
            sql,
            [category_id, name, description, price, stock_quantity, imageName],
            (err, data) => {
                return res.send(result.createResult(err, data))
            }
        )
    })
})

//Get all the products (list)
router.get("/", (req, res) => {
    const sql = "SELECT * FROM product";
  
    db.query(sql, (err, result) => {
      if (err) {
        return res.json({ status: "error", error: err });
      }
      res.json({ status: "success", data: result });
    });
  });

  // GET /product/active
router.get("/active", (req, res) => {
    const sql = "SELECT * FROM product WHERE is_active = 1";
  
    db.query(sql, (err, result) => {
      if (err) {
        return res.json({ status: "error", error: err });
      }
      res.json({ status: "success", data: result });
    });
  });
  
// PUT /product/disable/:id
router.put("/disable/:id", (req, res) => {
    const { id } = req.params;
  
    const sql = "UPDATE product SET is_active = 0 WHERE product_id = ?";
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.json({ status: "error", error: err });
      }
      res.json({ status: "success" });
    });
  });
  
  // PUT /product/enable/:id
router.put("/enable/:id", (req, res) => {
    const { id } = req.params;
  
    const sql = "UPDATE product SET is_active = 1 WHERE product_id = ?";
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.json({ status: "error", error: err });
      }
      res.json({ status: "success" });
    });
  });
  
//get products by product_id

  //update the products
  router.put('/update/:product_id', upload.single('image'), (req, res) => {
    const { category_id, name, description, price, stock_quantity } = req.body
    let sql
    let params
  
    if (req.file) {
      const imageName = req.file.filename + '.jpg'
      fs.renameSync(req.file.path, `productimages/${imageName}`)
  
      sql = `
        UPDATE product SET
        category_id=?, name=?, description=?, price=?, stock_quantity=?, image=?
        WHERE product_id=?
      `
      params = [category_id, name, description, price, stock_quantity, imageName, req.params.product_id]
    } else {
      sql = `
        UPDATE product SET
        category_id=?, name=?, description=?, price=?, stock_quantity=?
        WHERE product_id=?
      `
      params = [category_id, name, description, price, stock_quantity, req.params.product_id]
    }
  
    db.query(sql, params, (err, data) => {
      res.send(result.createResult(err, data))
    })
  })
  //delete product
router.delete("/delete/:id", (req, res) => {
    const sql = "DELETE FROM product WHERE product_id=?"
    db.query(sql, [req.params.id], (err, resultData) => {
      if (err) return res.send(result.createResult(err))
      if (resultData.affectedRows === 0)
        return res.send(result.createResult({ message: "Product not found" }))
      return res.send(result.createResult(null, "Product deleted"))
    })
  })
  
  // SEARCH PRODUCTS (Customer)
  // ✅ SEARCH MUST BE FIRST
router.get('/search', (req, res) => {
  const { q } = req.query

  if (!q || q.trim() === "") {
    return res.send(result.createResult(null, []))
  }

  const keyword = `%${q.trim()}%`

  const sql = `
    SELECT product_id, category_id, name, description, price, image, stock_quantity
    FROM product
    WHERE name LIKE ? OR description LIKE ?
  `

  db.query(sql, [keyword, keyword], (err, data) => {
    res.send(result.createResult(err, data))
  })
})


// ⬇️ KEEP ID ROUTES BELOW
router.get('/:product_id', (req, res) => {
  const sql = `SELECT * FROM product WHERE product_id=?`
  db.query(sql, [req.params.product_id], (err, data) => {
    res.send(result.createResult(err, data))
  })
})

//Get products by category only for customer
// GET /api/product/active/category/:category_id
router.get("/active/category/:category_id", (req, res) => {
  const sql = `
    SELECT product_id, name, description, price, image, stock_quantity
    FROM product
    WHERE category_id = ? AND is_active = 1
  `
  db.query(sql, [req.params.category_id], (err, data) => {
    if (err) return res.status(500).send("DB Error")
    res.json({ status: "success", data })
  })
})


module.exports = router