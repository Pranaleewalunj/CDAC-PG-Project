import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAdmin, loginCustomer } from "../services/auth";
import deliveryAxios from "../services/deliveryAxios";

function Login() {
  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signin = async () => {
    try {
      let result;

      // ADMIN LOGIN
      if (role === "admin") {
        result = await loginAdmin({ email, password });
      }

      // DELIVERY LOGIN
      else if (role === "delivery") {
        result = await deliveryAxios.post("/delivery/signin", {
          email,
          password,
        });
      }

      // CUSTOMER LOGIN
      else {
        result = await loginCustomer({ email, password });
      }

      // DELIVERY HANDLING
      if (role === "delivery") {
        if (result?.data?.token) {
          localStorage.setItem("delivery_token", result.data.token);
          localStorage.setItem("delivery_man_id", result.data.deliveryMan.id);

          toast.success("Delivery Login Successful");
          navigate("/delivery/dashboard");
        } else {
          toast.error("Invalid Delivery Login");
        }
        return;
      }

      // ADMIN & CUSTOMER HANDLING
      if (result?.data?.token) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("role", result.data.role);

        toast.success("Login Successful");

        if (result.data.role === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/home");
        }
      } else {
        toast.error("Invalid login response");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.error(error);
    }
  };
    return(
      

        <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ width: '1000px' }}>
          <h3 className="text-center mb-3">Login</h3>
  
          {/* Role Selection */}
          <div className="btn-group w-100 mb-3">
            <button
              className={`btn ${role === 'customer' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => setRole('customer')}
            >
              Customer
            </button>
            <button
              className={`btn ${role === 'admin' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setRole('admin')}
            >
              Admin
            </button>
          </div>
          <p className="text-center mt-3">
  Are you a delivery man?{" "}
  <span
    className="text-warning"
    style={{ cursor: "pointer" }}
    onClick={() => navigate("/delivery/login")}
  >
    Login here
  </span>
</p>
          {/* Email */}
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
  
          {/* Password */}
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
  
          {/* Login Button */}
          <button type="button" className="btn btn-dark w-100" onClick={signin}>
            Login as {role}
          </button>
  
          {/* Register */}
          <p className="text-center mt-3">
            New {role}?{' '}
            <span
              className="text-primary"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if(role==="admin"){
                  navigate("/register/admin")
                }
                else{
                  navigate("/register/customer")
                }}
                }
                >
              Register here
            </span>
          </p>
        </div>
      </div>
    )
}

export default Login