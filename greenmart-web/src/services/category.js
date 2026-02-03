import axios from 'axios'

export const getCategories=async()=>{
    const response=await axios.get(
        `http://localhost:4000/api/category/`
    )
    return response.data.data
}

