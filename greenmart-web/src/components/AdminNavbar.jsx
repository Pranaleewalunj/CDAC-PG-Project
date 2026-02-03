import { Link, useNavigate, useLocation } from "react-router-dom"

function AdminNavbar() {
  const navigate = useNavigate()
  const location=useLocation()

  const logout = () => {
    localStorage.clear()
    navigate("/")
  }

  const isProfilePage = location.pathname === '/admin/profile'
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
      <div className="navbar-nav d-flex align-items-center gap-3">
        
        {!isProfilePage && (
          <Link className="nav-link" to="/admindashboard">
            Dashboard
          </Link>
        )}
  
        {!isProfilePage && (
          <Link className="nav-link" to="/admin/profile">
            Profile
          </Link>
        )}
  
        <button className="btn btn-danger btn-sm ms-3" onClick={logout}>
          Logout
        </button>
  
      </div>
    </nav>
  )
  
}

export default AdminNavbar
