import { useEffect, useState } from "react";
import axios from "../../services/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState([]);
  const id = localStorage.getItem("delivery_id");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/delivery/my/${id}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div>
      <h3>My Orders</h3>
      {orders.map(o => (
        <div key={o.id}>
          Order {o.orderId}-{o.status}
          {o.status === "ASSIGNED" && (
            <button onClick={() => navigate(`/delivery/track/${o.id}`)}>
              Start Delivery
            </button>
          )}
        </div>
      ))}
    </div>
  );
}