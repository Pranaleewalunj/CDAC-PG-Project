import { useEffect, useState } from "react"
import axios from "../services/axiosConfig"
import AdminNavbar from "../components/AdminNavbar"

function AdminLowStock() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLowStock()
  }, [])

  const loadLowStock = async () => {
    try {
      const res = await axios.get("/admin/protected/low-stock")
      setProducts(res.data.data)
    } catch (err) {
      console.error(err)
      alert("Failed to load low stock products")
    } finally {
      setLoading(false)
    }
  }

  if (loading)
    return <p className="text-center mt-5">Loading...</p>

  return (
    <>
      <AdminNavbar />
      <div className="container-fluid mt-4 px-4">
        <h3 className="mb-3 text-danger">Low Stock Products</h3>

        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No low stock products 🎉
                </td>
              </tr>
            ) : (
              products.map(p => (
                <tr key={p.product_id}>
                  <td>
                    <img
                      src={`http://localhost:4000/productimages/${p.image}`}
                      width="60"
                      alt=""
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>₹{p.price}</td>
                  <td>
                    <span className="badge bg-danger">
                      {p.stock_quantity}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminLowStock
