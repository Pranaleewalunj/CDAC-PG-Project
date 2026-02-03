import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "../services/axiosConfig"

function AdminOrderDetails() {
  const { order_id } = useParams()
  const [items, setItems] = useState([])
  const [status, setStatus] = useState("")

  useEffect(() => {
    loadOrderDetails()
  }, [])

  const loadOrderDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/admin/protected/orders/${order_id}`,
        {
            headers:{
          Authorization: localStorage.getItem("token") }
        }
      )

      setItems(res.data.data)
    } catch (err) {
      console.error(err)
      alert("Failed to load order details")
    }
  }

  const updateStatus = async () => {
    try {
      await axios.put(
        "http://localhost:4000/api/admin/protected/orders/status",
        {
          order_id,
          status
        },
        {
          headers: { Authorization: localStorage.getItem("token") }
        }
      )

      alert("Status updated")
    } catch (err) {
      console.error(err)
      alert("Failed to update status")
    }
  }

  return (
    <div className="container-fluid mt-4 px-4">
      <h3>Order #{order_id}</h3>

      <div className="mb-3">
        <select
          className="form-select w-25"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="PLACED">PLACED</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        <button
          className="btn btn-success mt-2"
          onClick={updateStatus}
          disabled={!status}
        >
          Update Status
        </button>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {items.map(item => (
            <tr key={item.product_id}>
              <td>
                <img
                  src={`http://localhost:4000/productimages/${item.image}`}
                  width="60"
                  alt=""
                />
              </td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminOrderDetails
