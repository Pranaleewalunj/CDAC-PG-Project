import AdminNavbar from '../components/AdminNavbar'
import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from '../services/axiosConfig'
import DashboardCard from '../components/DashboardCard'

function Admindashboard(){
    const [summary,setSummary]=useState(null)
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate()

    useEffect(()=>{
        axios
        .get('/admin/protected/dashboard/summary')
        .then(res=>{
            setSummary(res.data.data[0])
            setLoading(false)
        })
        .catch(()=>setLoading(false))
    },[])

    if(loading)
    return <p className="text-center mt-5">Loading...</p>
    return (
        <>
        <AdminNavbar />
      <div className="container-fluid min-vh-100 d-flex flex-column pt-4">
        <h3 className="mb-4">Admin Dashboard</h3>

        <div className="flex-grow-1">
        <div className="row g-4">
          <DashboardCard
            title="Total Products"
            value={summary.totalProduct}
            color="primary"
            onClick={() => navigate("/admin/products")}
          />
          <DashboardCard
            title="Total Categories"
            value={summary.totalCategory}
            color="success"
            onClick={() => navigate("/admin/categories")}
          />
          <DashboardCard
            title="Total Orders"
            value={summary.totalOrders}
            color="warning"
            onClick={() => navigate("/admin/orders")}
          />
          <DashboardCard
            title="Low Stock Alerts"
            value={summary.lowStockAlerts}
            color="danger"
            onClick={() => navigate("/admin/low-stock")}
          />
        <div className="container mt-4">
    </div>
        </div>
      </div>
      </div>
    </>
    )}

export default Admindashboard