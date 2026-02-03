import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "../services/axiosConfig"
import { clearCartAction } from "../slices/Cartslice"
import CustomerNavbar from "../components/CustomerNavbar"
import { useState } from "react"

function Checkout() {
  const cartItems = useSelector(state => state.cart.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState("COD")

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const placeOrder = async () => {
    const payload = {
      items: cartItems,
      total_amount: total,
      payment_method: paymentMethod,
      payment_reference:
        paymentMethod === "COD" ? "COD" : "MOCK_TXN_" + Date.now()
    }

    const res = await axios.post("/order/add", payload)

    if (res.data.status === "success") {
      dispatch(clearCartAction())
      navigate("/orders")
    }
  }

  return (
    <>
      <CustomerNavbar />

      <div className="container mt-5">
        <h3>Checkout</h3>

        <h5>Total Amount: ₹{total}</h5>

        <hr />

        <h5>Choose Payment Method</h5>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          <label className="form-check-label">
            Cash on Delivery
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            checked={paymentMethod === "ONLINE"}
            onChange={() => setPaymentMethod("ONLINE")}
          />
          <label className="form-check-label">
            Online Payment
          </label>
        </div>

        <br />

        {paymentMethod === "ONLINE" ? (
          <button
            className="btn btn-success"
            onClick={placeOrder}
          >
            Pay Now
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={placeOrder}
          >
            Place Order (COD)
          </button>
        )}
      </div>
    </>
  )
}

export default Checkout
