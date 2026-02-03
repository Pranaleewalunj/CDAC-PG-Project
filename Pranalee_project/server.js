const express = require("express")
const app = express()
const cors = require("cors")

const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({
  origin: corsOrigin,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())
app.use('/productimages', express.static('productimages'))

// ROUTES
const customerRoute = require('./routes/customer')
const customerAuthRoutes = require('./routes/customer.routes')
const adminRoute = require('./routes/admin')
const adminRoutes = require('./routes/admin.routes')
const categoryRoute = require('./routes/category')
const productRoute = require('./routes/product')
const orderRoute = require('./routes/orders')

const authorizeCustomer = require('./utils/authCustomer')
const authorizeAdmin = require('./utils/authAdmin')

// PUBLIC
app.use("/api/customer", customerAuthRoutes) // signin/signup
app.use("/api/admin", adminRoutes)
app.use("/api/category", categoryRoute)
app.use("/api/product", productRoute)

// PROTECTED
app.use("/api/customer", authorizeCustomer, customerRoute)
app.use("/api/order", authorizeCustomer, orderRoute)
app.use("/api/admin/protected", authorizeAdmin, adminRoute)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
