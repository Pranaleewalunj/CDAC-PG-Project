import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCartAction } from '../slices/Cartslice'

function ProductCard({ product_id, name, description, price, image }) {
  const dispatch = useDispatch()

  const imageURL = image
    ? `http://localhost:4000/productimages/${image}`
    : ""

  const addToCart = () => {
    if(!product_id){
      console.error("Product ID is missing",{product_id,name,price})
    }
    
    dispatch(addToCartAction({
      product_id,
      name,
      price: Number(price),
      quantity: 1
    }))
  }

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={imageURL}
        className="card-img-top"
        alt={name}
        style={{ height: "180px", objectFit: "contain" }}
      />

      <div className="card-body d-flex flex-column">
        <h6>{name}</h6>
        <p className="text-muted">{description}</p>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold">₹{price}</span>
          <button
            className="btn btn-warning btn-sm"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
