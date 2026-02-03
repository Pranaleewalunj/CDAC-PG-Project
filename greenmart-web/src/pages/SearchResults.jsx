import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "../services/axiosConfig"
import CustomerNavbar from "../components/CustomerNavbar"

function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q")
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (!query) return

    axios
      .get(`/product/search?q=${query}`)
      .then(res => setProducts(res.data.data))
  }, [query])

  return (
    <>
      <CustomerNavbar />

      <div className="container mt-4">
        <h4>Search results for: "{query}"</h4>

        {products.length === 0 && (
          <p className="text-muted mt-3">No products found</p>
        )}

        <div className="row mt-3">
          {products.map(product => (
            <div className="col-md-3 mb-4" key={product.product_id}>
              <div className="card h-100">
                <img
                  src={`http://localhost:4000/productimages/${product.image}`}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h6>{product.name}</h6>
                  <p>₹{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SearchResults
