import { useEffect, useState } from "react"
import axios from "../services/axiosConfig"
import AdminNavbar from "../components/AdminNavbar"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function AdminProducts() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  const loadProducts = async () => {
    const res = await axios.get("/product")
    if (res.data.status === "success") {
      setProducts(res.data.data)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const deleteProduct = (product_id) => {
    console.log("Delete product ID:", product_id)

    if (!product_id) {
      toast.error("Invalid product ID")
      return
    }

    if (!window.confirm("Delete product?")) return

    axios
      .delete(`/product/delete/${product_id}`)
      .then(res => {
        console.log("Delete response:", res.data)
        if (res.data.status === "success") {
          toast.success("Product deleted")
          loadProducts()
        } else {
          toast.error("Delete failed")
        }
      })
      .catch(err => {
        console.error(err)
        toast.error("Server error")
      })
  }

  const disableProduct = (id) => {
    if (!window.confirm("Disable this product?")) return;
  
    axios.put(`/product/disable/${id}`).then(res => {
      if (res.data.status === "success") {
        toast.success("Product disabled");
        loadProducts();
      }
    });
  };
  
  const enableProduct = (id) => {
    axios.put(`/product/enable/${id}`).then(res => {
      if (res.data.status === "success") {
        toast.success("Product restored");
        loadProducts();
      }
    });
  };
  
  return (
    <>
      <AdminNavbar />
      <div className="container-fluid mt-4 px-4">
        <div className="d-flex justify-content-between">
          <h3>Products</h3>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/product/add")}
          >
            Add Product
          </button>
        </div>

        <table className="table mt-3">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map(p => (
              <tr key={p.product_id}>
                <td>
                  <img
                    src={`http://localhost:4000/productimages/${p.image}`}
                    width="60"
                  />
                </td>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.stock_quantity}</td>
                <td>
  <button
    className="btn btn-sm btn-warning me-2"
    onClick={() => navigate(`/admin/product/edit/${p.product_id}`)}
  >
    Edit
  </button>

  {p.is_active === 1 ? (
    <button
      className="btn btn-sm btn-danger"
      onClick={() => disableProduct(p.product_id)}
    >
      Disable
    </button>
  ) : (
    <button
      className="btn btn-sm btn-success"
      onClick={() => enableProduct(p.product_id)}
    >
      Restore
    </button>
  )}
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminProducts
