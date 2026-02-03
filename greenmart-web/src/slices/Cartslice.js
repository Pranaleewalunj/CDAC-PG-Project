import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: []
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartAction: (state, action) => {
      const item = action.payload
      // Use product_id to identify unique products
      if(!item.product_id){
          console.warn("Product ID is missing",item)
          return
      }
      const existingItem = state.items.find(
        p => p.product_id === item.product_id
      )

      if (existingItem) {
        existingItem.quantity += item.quantity // increment by 1 or given quantity
      } else {
        state.items.push({ ...item })
      }
    },

    removeFromCartAction: (state, action) => {
      state.items = state.items.filter(
        item => item.product_id !== action.payload
      )
    },

    increaseQuantityAction: (state, action) => {
      const item = state.items.find(
        p => p.product_id === action.payload
      )
      if (item) item.quantity += 1
    },

    decreaseQuantityAction: (state, action) => {
      const item = state.items.find(
        p => p.product_id === action.payload
      )
      if (item) {
        if (item.quantity > 1) item.quantity -= 1
        else state.items = state.items.filter(i => i.product_id !== item.product_id)
      }
    },

    clearCartAction: (state) => {
      state.items = []
    }
  }
})

export const {
  addToCartAction,
  removeFromCartAction,
  increaseQuantityAction,
  decreaseQuantityAction,
  clearCartAction
} = cartSlice.actions

export default cartSlice.reducer
