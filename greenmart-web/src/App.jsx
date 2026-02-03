import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Admindashboard from "./pages/Admindashboard"
import CustomerProfile from "./components/CustomerProfile"
import AdminProfile from "./components/AdminProfile"
import AdminRegister from   "./pages/AdminRegister"
import CustomerRegister from "./pages/CustomerRegister"
//import HomeRedirect from "./pages/HomeRedirect"
import ProtectedRoute from "./components/ProtectedRoute"
import Orders from "./pages/Orders"
import Cart from "./pages/cart"
import AdminCategories from './pages/AdminCategories'
import AdminProducts from './pages/AdminProducts'
import AddEditProduct from './pages/AddEditProduct'
import AdminOrders from './pages/AdminOrders'
import AdminOrderDetails from './pages/AdminOrderDetails'
import AdminLowStock from './pages/AdminLowStock'
import SearchResults from './pages/SearchResults'
import Checkout from './pages/Checkout'
import AdminDeliveryTrack from './pages/AdminDeliveryTrack'
import DeliveryProtectedRoute from './components/DeliveryProtectedRoute'
import DeliveryDashboard from '../src/pages/delivery/DeliveryDashboard'
import DeliveryLogin from '../src/pages/delivery/DeliveryLogin'
import DeliveryTracking from '../src/pages/delivery/DeliveryTracking'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div className="app-wrapper">
       <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    <Routes>

   {/*<Route path="/" element={<HomeRedirect />} />*/} 
  <Route path="/" element={<Navigate to="/login" replace/>}/>

    <Route path="/login" element={<Login />} />
  
    {/* CUSTOMER */}
    <Route
      path="/home"
      element={
        <ProtectedRoute role="customer">
          <Home />
        </ProtectedRoute>
      }
    />
  
    <Route
      path="/customer/profile"
      element={
        <ProtectedRoute role="customer">
          <CustomerProfile />
        </ProtectedRoute>
      }
    />
    <Route
  path="/checkout"
  element={
    <ProtectedRoute role="customer">
      <Checkout />
    </ProtectedRoute>
  }
/>
    {/* ADMIN */}
    <Route
      path="/admindashboard"
      element={
        <ProtectedRoute role="admin">
          <Admindashboard/>
        </ProtectedRoute>
      }
    />
  
    <Route
      path="/admin/profile"
      element={
        <ProtectedRoute role="admin">
          <AdminProfile />
        </ProtectedRoute>
      }
    />
    <Route
  path="/orders"
  element={
    <ProtectedRoute role="customer">
      <Orders />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/products"
  element={
    <ProtectedRoute role="admin">
      <AdminProducts />
    </ProtectedRoute>
  }
/>

{/* ADD product */}
<Route
  path="/admin/product/add"
  element={
    <ProtectedRoute role="admin">
      <AddEditProduct />
    </ProtectedRoute>
  }
/>

{/* EDIT product */}
<Route
  path="/admin/product/edit/:id"
  element={
    <ProtectedRoute role="admin">
      <AddEditProduct />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/orders"
  element={
    <ProtectedRoute role="admin">
      <AdminOrders />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/orders/:order_id"
  element={
    <ProtectedRoute role="admin">
      <AdminOrderDetails />
    </ProtectedRoute>
  }
/>  
<Route
  path="/admin/low-stock"
  element={
    <ProtectedRoute>
      <AdminLowStock />
    </ProtectedRoute>
  }
/>
<Route
  path="/search"
  element={
    <ProtectedRoute>
      <SearchResults />
    </ProtectedRoute>
  }
/>
<Route
  path="/delivery/dashboard"
  element={
    <DeliveryProtectedRoute>
      <DeliveryDashboard />
    </DeliveryProtectedRoute>
  }
/>

<Route
  path="/delivery/track/:assignmentId"
  element={
    <DeliveryProtectedRoute>
      <DeliveryTracking />
    </DeliveryProtectedRoute>
  }
/>
<Route
  path="/admin/track/:id"
  element={
    <ProtectedRoute role="admin">
      <AdminDeliveryTrack />
    </ProtectedRoute>
  }
/>
    {/* PUBLIC */}
    <Route path="/register/admin" element={<AdminRegister />} />
    <Route path="/register/customer" element={<CustomerRegister />} />
    <Route path="/cart" element={<Cart/>} />
    <Route path='/admin/categories' element={<AdminCategories/>}/>
    <Route path="/delivery/login" element={<DeliveryLogin />} />   
    <Route path="*" element={<Navigate to="/login" replace />} />
  
  </Routes>
</div>

  )
}

export default App
