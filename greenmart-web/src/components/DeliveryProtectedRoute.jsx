import { Navigate } from "react-router-dom"

const DeliveryProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("delivery_token")

  if (!token) {
    return <Navigate to="/delivery/login" replace />
  }

  return children
}

export default DeliveryProtectedRoute