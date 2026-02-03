import { useEffect, useState } from 'react'
import axios from '../services/axiosConfig'
import { toast } from 'react-toastify'
import AdminNavbar from '../components/AdminNavbar'

function AdminProfile() {
  const [admin, setAdmin] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/admin/protected/profile')
      .then(res => {
        setAdmin(res.data.data)
        setLoading(false)
      })
      .catch(() => toast.error('Failed to load profile'))
  }, [])

  const updateProfile = () => {
    axios.put('/admin/protected/profile', {
      name: admin.name
    })
      .then(() => toast.success('Profile Updated'))
      .catch(() => toast.error('Update failed'))
  }

  if (loading) return <p>Loading...</p>

  return (
    <>
      <AdminNavbar />
      <div className="container-fluid min-vh-100 d-flex flex-column pt-4">
        <h3>Admin Profile</h3>

        <div className="flex-grow-1">
        <input
          className="form-control mb-2"
          value={admin.name || ""}
          onChange={e => setAdmin({ ...admin, name: e.target.value })}
          placeholder="Name"
        />

        <input
          className="form-control mb-3"
          value={admin.email || ""}
          disabled
          placeholder="Email"
        />

        <button className="btn btn-primary" onClick={updateProfile}>
          Update Profile
        </button>
      </div>
      </div>
    </>
  )
}

export default AdminProfile
