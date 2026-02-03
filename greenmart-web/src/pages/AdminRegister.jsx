import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'

function AdminRegister(){
    const navigate=useNavigate()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmPassword]=useState("")

    const registerAdmin=async()=>{
        if(!password||!confirmpassword){
            toast.error("Please enter password and confirm password")
            return
        }
        if(password!==confirmpassword){
            toast.error("Passwords do not match")
            return
        }
        const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/
        if(!passwordRegex.test(password)){
            toast.error("Password must be 12+ characters, include uppercase, lowercase, number, and special character")
            return
        }
        try{
            await axios.post("http://localhost:4000/api/admin/signup",{
                name,email,password,
            })
            if(result)
            toast.success("Admin Registered Successfully")
            navigate("/login")
        }catch(error){
            toast.error(error.response?.data?.message||"Registration Failed")
        }
    }
    return(
        <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "1000px" }}>
        <h3 className="text-center mb-4">Admin Registration</h3>

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

          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn btn-success w-100"
            onClick={registerAdmin}
          >
            Register as Admin
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

export default AdminRegister