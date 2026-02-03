import { useEffect, useState } from "react"
import axios from "../services/axiosConfig"
import { toast } from "react-toastify"
import CustomerNavbar from "../components/CustomerNavbar"

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("/order")
      .then(res => {
        if (res.data.status === "success") {
          setOrders(res.data.data)
        } else {
          toast.error("Failed to load orders")
        }
        setLoading(false)
      })
      .catch(() => {
        toast.error("Failed to load orders")
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>
  const downloadInvoice = async (orderId) => {
    try {
      const res = await axios.get(`/order/invoice/${orderId}`, {
        responseType: "blob" // IMPORTANT
      })
  
      const blob = new Blob([res.data], { type: "application/pdf" })
      const url = window.URL.createObjectURL(blob)
  
      const a = document.createElement("a")
      a.href = url
      a.download = `invoice_${orderId}.pdf`
      document.body.appendChild(a)
      a.click()
  
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
      toast.error("Failed to download invoice")
    }
  }
  
  return (
    <>
      <CustomerNavbar />
      <div className="container-fluid min-vh-100 d-flex flex-column pt-4">
        <h3>My Orders</h3>

        <div className="flex-grow-1">
        {orders.length === 0 && <p>No orders found</p>}

        {orders.map(order => (
  <div key={order.order_id} className="border p-3 mb-4 rounded">
    <h5>Order #{order.order_id}</h5>
    <p><b>Date:</b> {order.order_date}</p>
    <p><b>Status:</b> {order.status}</p>
    <p><b>Total:</b> ₹{order.total_amount}</p>

    <hr />

    {order.items.map(item => (
      <div
        key={item.product_id}
        className="d-flex align-items-center mb-3"
      >
        <img
          src={`http://localhost:4000/productimages/${item.image}`}
          alt={item.name}
          width="60"
          className="me-3"
        />

        <div className="flex-grow-1">
          <div>{item.name}</div>
          <small>
            ₹{item.price} × {item.quantity}
          </small>
        </div>

        <b>₹{item.price * item.quantity}</b>
      </div>
    ))}
    <button
  className="btn btn-sm btn-outline-primary mt-2"
  onClick={() => downloadInvoice(order.order_id)}
>
  Download Invoice
</button>

  </div>
        ))}
      </div>
      </div>
    </>
  )
}

export default Orders
