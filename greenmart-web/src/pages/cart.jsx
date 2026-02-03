import { useSelector, useDispatch } from 'react-redux'
import {
  removeFromCartAction,
  increaseQuantityAction,
  decreaseQuantityAction
} from '../slices/Cartslice'
import CustomerNavbar from '../components/CustomerNavbar'
import axios from "../services/axiosConfig"
import {clearCartAction} from '../slices/Cartslice'
import {useNavigate} from 'react-router-dom'

function Cart() {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const cartItems = useSelector(state => state.cart.items)

  if (!cartItems || cartItems.length === 0) {
    return <h3 className="text-center mt-5">Cart is Empty</h3>
  }

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  )

  const placeOrder = async () => {
    try {
      const res = await axios.post("/order/add", {
        items: cartItems,
        total_amount: total,
        payment_method: "COD",       // or MOCK / UPI / CARD
        payment_status: "PENDING",   // PAID if mock success
        payment_reference: "COD"
      })
  
      if (res.data.status === "success") {
        dispatch(clearCartAction())
        navigate("/orders")
      }
    } catch (err) {
      console.error(err)
      alert("Order failed")
    }
  }
  return (
    <>
    <CustomerNavbar/>
    <div className="container-fluid min-vh-100 d-flex flex-column pt-4">
      <h3>Your Cart</h3>

      <div className="flex-grow-1">

      {cartItems.map(item => (
        <div key={item.product_id} className="d-flex justify-content-between align-items-center border p-2 mb-2">
          <div>{item.name}</div>

          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => dispatch(decreaseQuantityAction(item.product_id))}
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              className="btn btn-sm btn-secondary"
              onClick={() => dispatch(increaseQuantityAction(item.product_id))}
            >
              +
            </button>
          </div>

          <div>₹{Number(item.price) * item.quantity}</div>

          <button
            className="btn btn-sm btn-danger"
            onClick={() => dispatch(removeFromCartAction(item.product_id))}
          >
            ✕
          </button>
        </div>
      ))}

      <h4 className="mt-3">Total: ₹{total}</h4>
      <button className="btn btn-success" onClick={()=>navigate('/checkout')}>
  Proceed to Checkout
</button>

    </div>
    </div>
    </>
  )
}

export default Cart
