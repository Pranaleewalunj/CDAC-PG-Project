import {Link, Navigate, useNavigate} from 'react-router-dom'

function Navbar(){
    return (
        <nav className="navbar navbar-dark bg-dark px-4">
          <Link className="navbar-brand" to="/">
            MyApp
          </Link>
    
          <div>
            <Link className="btn btn-outline-light me-2" to="/">
              Login
            </Link>
            <Link className="btn btn-outline-light me-2" to="/register/customer">
              Customer Register
            </Link>
            <Link className="btn btn-outline-light" to="/register/admin">
              Admin Register
            </Link>
          </div>
        </nav>
      )
}
    

export default Navbar;