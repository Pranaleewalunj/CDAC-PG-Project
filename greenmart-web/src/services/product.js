import axios from 'axios'

export const getProducts=async()=>{
        const response=await axios.get(`http://localhost:4000/api/product/active`)
        return response.data.data
        }

export const getProductsByCategory=async(categoryId)=>{
    const response=await axios.get(
        `http://localhost:4000/api/product/active/category/${categoryId}`
    )
    return response.data.data
}