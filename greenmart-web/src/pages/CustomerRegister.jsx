import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'

function CustomerRegister() {
  const navigate=useNavigate()

  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confirmpassword,setConfirmPassword]=useState("")
  const [address,setAddress]=useState("")
  const [phone,setPhone]=useState("")

  const registerCustomer=async()=>{
    if(!password||!confirmpassword){
      toast.error("Please enter password and confirm password")
      return
    }
    if(password!==confirmpassword){
      toast.error("Passwords do not match")
      return
    }
    try{
      await axios.post("http://localhost:4000/api/customer/signup",{
        name,email,password,address,phone,
      })
      toast.success("Customer Registered successfully")
      navigate("/login")
    }catch(error){
      toast.error(error.response?.data?.message||"Registration failed")
    }
  }
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="card p-4 shadow" style={{ width: "1000px" }}>
      <h3 className="text-center mb-4">Customer Registration</h3>

      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Phone</label>
          <input
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn btn-success w-100"
          onClick={registerCustomer}
        >
          Register as Customer
        </button>

        <div className="text-center mt-3">
  <span className="text-muted">
    Already have an account?{" "}
  </span>
  <Link to="/login" className="fw-bold text-decoration-none">
    Login
  </Link>
</div>

      </form>
    </div>
  </div>
  )
}

export default CustomerRegister