import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { clearCartAction } from "../slices/Cartslice"
import { useState } from "react"

function CustomerNavbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [query, setQuery] = useState("")

  const logout = () => {
    dispatch(clearCartAction())
    localStorage.clear()
    navigate("/login")
  }

  // 🔍 Search handler
  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/search?q=${query}`)
    setQuery("")
  }

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
      
      {/* LEFT LINKS */}
      <div className="navbar-nav me-auto d-flex align-items-center gap-3">
        <Link className="nav-link" to="/home">Home</Link>
        <Link className="nav-link" to="/customer/profile">Profile</Link>
        <Link className="nav-link" to="/cart">Cart</Link>
        <Link className="nav-link" to="/orders">Orders</Link>
      </div>

      {/* 🔍 SEARCH BAR */}
      <form className="d-flex me-3" onSubmit={handleSearch}>
        <input
          className="form-control form-control-sm me-2"
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-outline-light btn-sm">
          Search
        </button>
      </form>

      {/* LOGOUT */}
      <button className="btn btn-danger btn-sm" onClick={logout}>
        Logout
      </button>
    </nav>
  )
}

export default CustomerNavbar
