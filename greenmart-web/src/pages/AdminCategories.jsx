import {useEffect,useState} from 'react'
import axios from '../services/axiosConfig'
import AdminNavbar from '../components/AdminNavbar'
import {toast} from 'react-toastify'

function AdminCategories(){
    const [categories,setCategories]=useState([])
    const [form,setForm]=useState({
        category_id:"",
        category_name:"",
        description:""
    })

    const loadCategories=()=>{
        axios.get('/category')
        .then(res=>setCategories(res.data.data))
        .catch(()=>toast.error('Failed to load categories'))
    }
    useEffect(()=>{
        loadCategories()
    },[])
    const addCategory=()=>{
        axios.post("/category/addCategory",form)
        .then(()=>{
            toast.success('Category Added')
            loadCategories()
            setForm({category_id:"",category_name:"",description:""})
        })
        .catch(()=>toast.error('Add Failed'))
    }

    const updateCategory=(cat)=>{
        axios.put('/category/updateCategory',cat)
        .then(()=>{
            toast.success('Category Updated')
            loadCategories()
        })
        .catch(()=>toast.error('Update failed'))
    }
    const deleteCategory=(id)=>{
        axios.delete(`/category/deletebyid/${id}`)
        .then(()=>{
            toast.success('Category Deleted')
            loadCategories()
        })
        .catch(()=>toast.error('Delete Failed'))
    }
    return(
        <>
      <AdminNavbar />
      <div className="container-fluid mt-4 px-4">
        <h3>Category Management</h3>

        {/* ADD CATEGORY */}
        <div className="card p-3 mb-4">
          <h5>Add Category</h5>
          <input
            className="form-control mb-2"
            placeholder="Category ID"
            value={form.category_id}
            onChange={e => setForm({ ...form, category_id: e.target.value })}
          />
          <input
            className="form-control mb-2"
            placeholder="Category Name"
            value={form.category_name}
            onChange={e => setForm({ ...form, category_name: e.target.value })}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <button className="btn btn-success" onClick={addCategory}>
            Add Category
          </button>
        </div>

        {/* LIST CATEGORIES */}
        {categories.map(cat => (
          <div key={cat.category_id} className="border p-3 mb-2">
            <input
              className="form-control mb-1"
              value={cat.category_name}
              onChange={e =>
                setCategories(categories.map(c =>
                  c.category_id === cat.category_id
                    ? { ...c, category_name: e.target.value }
                    : c
                ))
              }
            />
            <textarea
              className="form-control mb-2"
              value={cat.description}
              onChange={e =>
                setCategories(categories.map(c =>
                  c.category_id === cat.category_id
                    ? { ...c, description: e.target.value }
                    : c
                ))
              }
            />
            <button
              className="btn btn-primary me-2"
              onClick={() => updateCategory(cat)}
            >
              Update
            </button>
            <button
              className="btn btn-danger"
              onClick={() => deleteCategory(cat.category_id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
    )
}

export default AdminCategories