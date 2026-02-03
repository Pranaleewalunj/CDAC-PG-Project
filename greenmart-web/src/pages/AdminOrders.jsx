import { useEffect, useState } from "react";
import axios from "../services/axiosConfig";
import springAxios from "../services/springAxios";
import { useNavigate } from "react-router-dom";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [freeMen, setFreeMen] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedMan, setSelectedMan] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
    loadFreeDeliveryMen();
  }, []);

  // Load Orders from Node
  const loadOrders = async () => {
    try {
      const res = await axios.get("admin/protected/orders", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setOrders(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load orders");
    }
  };

  // Load FREE Delivery Men from Spring
  const loadFreeDeliveryMen = async () => {
    try {
      const res = await springAxios.get("/delivery/free-men");
      setFreeMen(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Assign Delivery Man
  const assignDelivery = async () => {
    try {
      await springAxios.post("/delivery/assign", {
        orderId: selectedOrder,
        deliveryManId: Number(selectedMan),
      });

      alert("Delivery man assigned");
      setSelectedOrder(null);
      setSelectedMan("");
      loadOrders();
      loadFreeDeliveryMen();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Assignment failed");
    }
  };

  // Mark Delivered (Node + Spring)
  const markDelivered = async (order_id) => {
    try {
      await axios.put(`/admin/protected/orders/delivered/${order_id}`, {}, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      await springAxios.put(`/delivery/free-by-order/${order_id}`);

      alert("Order Delivered & Delivery Man Free");
      loadOrders();
      loadFreeDeliveryMen();
    } catch (err) {
      console.error(err);
      alert("Failed to mark delivered");
    }
  };

  return (
    <div className="container-fluid mt-4 px-4">
      <h3>All Orders</h3>

      
      {/* Assign Delivery Modal */}
      {selectedOrder && (
        <div className="card p-3 mt-3 border border-primary">
          <h5>Assign Delivery Man for Order #{selectedOrder}</h5>

          <select
            className="form-select mt-2"
            value={selectedMan}
            onChange={(e) => setSelectedMan(e.target.value)}
          >
            <option value="">Select Delivery Man</option>
            {freeMen.map((dm) => (
              <option key={dm.id} value={dm.id}>
                {dm.name} (ID: {dm.id})
              </option>
            ))}
          </select>

          <button
            className="btn btn-success mt-2"
            disabled={!selectedMan}
            onClick={assignDelivery}
          >
            Assign
          </button>

          <button
            className="btn btn-danger mt-2 ms-2"
            onClick={() => setSelectedOrder(null)}
          >
            Cancel
          </button>
        </div>
      )}

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.customer_name}</td>
              <td>{order.email}</td>
              <td>₹{order.total_amount}</td>

              <td>
              <span className={`badge ${
  order.delivery_status === "PENDING_ASSIGNMENT" ? "bg-warning" :
  order.delivery_status === "ASSIGNED" ? "bg-info" :
  order.delivery_status === "DELIVERED" ? "bg-success" :
  "bg-secondary"
}`}>
  {order.delivery_status}
</span>
              </td>

              <td>
                <button className="btn btn-sm btn-primary me-2"
                  onClick={() => navigate(`/admin/orders/${order.order_id}`)}>
                  View
                </button>

                {/* Assign Delivery */}
                {order.delivery_status === "PENDING_ASSIGNMENT" && (
                  <button className="btn btn-sm btn-warning me-2"
                    onClick={() => setSelectedOrder(order.order_id)}>
                    Assign Delivery
                  </button>
                )}

                {/* Track */}
                {order.delivery_man_id && (
                  <button className="btn btn-sm btn-info me-2"
                    onClick={() => navigate(`/admin/track/${order.order_id}`)}>
                    Track
                  </button>
                )}

                {/* Delivered */}
                {order.delivery_status === "ASSIGNED" && (
                  <button className="btn btn-sm btn-success"
                    onClick={() => markDelivered(order.order_id)}>
                    Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;