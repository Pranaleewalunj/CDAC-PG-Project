import { useEffect, useState } from "react"
import axios from "../services/axiosConfig"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

function AddEditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    image: null
  })

  // load categories always
  useEffect(() => {
    axios.get("/category").then(res => {
      if (res.data.status === "success") {
        setCategories(res.data.data)
      }
    })
  }, [])

  // load product ONLY if edit
  useEffect(() => {
    if (id) {
      axios.get(`/product/${id}`).then(res => {
        if (res.data.status === "success") {
          const p = res.data.data[0]
          setFormData({
            category_id: p.category_id,
            name: p.name,
            description: p.description,
            price: p.price,
            stock_quantity: p.stock_quantity,
            image: null
          })
        }
      })
    }
  }, [id])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFile = e => {
    setFormData({ ...formData, image: e.target.files[0] })
  }

  const handleSubmit = e => {
    e.preventDefault()

    const data = new FormData()
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) data.append(key, formData[key])
    })

    const apiCall = id
      ? axios.put(`/product/update/${id}`, data)
      : axios.post("/product/add", data)

    apiCall.then(res => {
      if (res.data.status === "success") {
        toast.success(id ? "Product updated" : "Product added")
        navigate("/admin/products")
      }
    })
  }

  return (
    <div className="container-fluid mt-4 px-4">
      <h3>{id ? "Edit Product" : "Add Product"}</h3>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="form-control mb-2"
          required
        >
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c.category_id} value={c.category_id}>
              {c.category_name}
            </option>
          ))}
        </select>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Name"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Description"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Price"
          required
        />

        <input
          type="number"
          name="stock_quantity"
          value={formData.stock_quantity}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Stock"
          required
        />

        <input
          type="file"
          className="form-control mb-3"
          onChange={handleFile}
        />

        <button className="btn btn-success">
          {id ? "Update" : "Add"} Product
        </button>
      </form>
    </div>
  )
}

export default AddEditProduct
