import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ProductCard from "../components/ProductCard"
import {
  getProducts,
  getProductsByCategory
} from "../services/product"
import { getCategories } from "../services/category"
import CustomerNavbar from '../components/CustomerNavbar'
import {useNavigate} from "react-router-dom"

function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [loading,setLoading]=useState(false)

  const navigate=useNavigate()
  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
        setLoading(true)

      const [cats, prods] = await Promise.all([
        getCategories(),
        getProducts()
      ])

      setCategories(Array.isArray(cats) ? cats : [])
      setProducts(Array.isArray(prods) ? prods : [])
    } catch (err) {
      toast.error("Failed to load data")
    }
    finally{
        setLoading(false)
    }
  }

  const handleCategoryChange = async (e) => {
    const value = e.target.value  
    setSelectedCategory(value)

    try {
        setLoading(true)
        let prods
      if (value === "") {
        prods = await getProducts()
      } else {
        prods = await getProductsByCategory(value)
      }
      setProducts(Array.isArray(prods) ? prods : [])
    } catch {
      toast.error("Failed to load products")
      setProducts([])
    }
    finally{
        setLoading(false)
    }
  }

  console.log(categories)
  console.log("first product ",products[0])
  return (
    <> 
    <CustomerNavbar/>
    <div className="container-fluid mt-4 px-4">
  
      {/* CATEGORY DROPDOWN */}
      <select
        className="form-select mb-4"
        value={selectedCategory}
        onChange={handleCategoryChange}
        disabled={loading}
      >
        <option key="all" value="">
          All Categories
        </option>
  
        {Array.isArray(categories) &&
          categories.map((cat, index) => (
            <option
              key={`cat-${cat.category_id ?? index}`}   
              value={cat.category_id}
            >
              {cat.category_name}
            </option>
          ))}
      </select>
  
      {/* PRODUCT SECTION */}
      <div className="row g-4 mt-3">

{loading && (
  <div className="text-center w-100 mt-5">
    <div className="spinner-border text-warning" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="mt-2">Loading products...</p>
  </div>
)}

{!loading && products.length === 0 && (
  <div className="text-center w-100 mt-5">
    <h5>No products found</h5>
    <p>Please try another category.</p>
  </div>
)}

{!loading &&
  products.map((p) => (
    <div
      className="col-12 col-sm-6 col-md-4 col-lg-3"
      key={p.product_id}
    >
      <ProductCard
  product_id={p.product_id}
  name={p.name}
  description={p.description}
  price={p.price}
  image={p.image}
  quantity={p.stock_quantity}
/>
    </div>
  ))}
</div>
</div>
</>
  )
}

export default Home
