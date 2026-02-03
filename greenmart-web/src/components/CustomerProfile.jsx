import { useEffect, useState } from 'react'
import axios from '../services/axiosConfig'
import { toast } from 'react-toastify'
import CustomerNavbar from '../components/CustomerNavbar'

function CustomerProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/customer/profile')
      .then(res => {
        if (res.data.status === "success") {
          setProfile(res.data.data)
        } else {
          toast.error("Profile not found")
        }
        setLoading(false)
      })
      .catch(() => {
        toast.error('Failed to load profile')
        setLoading(false)
      })
  }, [])

  const updateProfile = () => {
    axios.put('/customer/profile', {
        phone: profile.phone,
        address: profile.address
    })
    .then(res => {
        if(res.data.status === "success"){
            toast.success(res.data.message)
        } else {
            toast.error(res.data.error || 'Update failed')
        }
    })
    .catch(err => {
        console.error(err)
        toast.error('Update failed')
    })
}


  if (loading) return <p>Loading...</p>

  return (
    <>
      <CustomerNavbar />
      <div className="container-fluid min-vh-100 d-flex flex-column pt-4">
        <h3>My Profile</h3>
        <div className="flex-grow-1">
        <input
          className="form-control mb-2"
          value={profile.name}
          onChange={e => setProfile({ ...profile, name: e.target.value })}
          placeholder="Name"
        />

        <input
          className="form-control mb-2"
          value={profile.email}
          placeholder="Email"
          disabled
        />

        <input
          className="form-control mb-2"
          value={profile.phone}
          onChange={e => setProfile({ ...profile, phone: e.target.value })}
          placeholder="Phone"
        />

        <textarea
          className="form-control mb-3"
          value={profile.address}
          onChange={e => setProfile({ ...profile, address: e.target.value })}
          placeholder="Address"
        />

        <button className="btn btn-success" onClick={updateProfile}>
          Update Profile
        </button>
      </div>
      </div>
    </>
  )
}

export default CustomerProfile
