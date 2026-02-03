import axios from 'axios'

const API=axios.create({
    baseURL:'http://localhost:4000/api'
})

API.interceptors.request.use(req => {
    const token = localStorage.getItem("token")
    if (token && !req.url.includes("/signin") && !req.url.includes("/signup")) {
      req.headers.Authorization = `Bearer ${token}`  // ✅ use standard Authorization header
  }
    return req
  })

export const loginCustomer=({email,password})=>{
return API.post("/customer/signin",{email,password})
.then(res=>res.data)
}

export const loginAdmin=({email,password})=>{
return API.post("/admin/admin/signin",{email,password})
.then(res=>res.data)
}