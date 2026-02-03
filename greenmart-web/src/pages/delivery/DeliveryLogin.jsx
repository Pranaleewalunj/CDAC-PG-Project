import { useState } from "react";
import deliveryAxios from "../../services/deliveryAxios";
import { useNavigate } from "react-router-dom";

export default function DeliveryLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await deliveryAxios.post("/delivery/signin", {
        email,
        password,
      });

      localStorage.setItem("delivery_token", res.data.token);
      localStorage.setItem("delivery_id", res.data.deliveryMan.id);

      navigate("/delivery/dashboard");
    } catch (err) {
      alert("Invalid Delivery Login");
      console.log(err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Delivery Man Login</h3>

        <input
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-warning w-100" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}