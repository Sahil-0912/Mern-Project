import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    productList: [],
}

export const addProduct = createAsyncThunk('product/addProduct', async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/product`, data)
    return res.data
})

export const viewProduct = createAsyncThunk('product/viewProduct', async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/product`)
    return res.data
})


export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/product/${id}`)
    return res.data
})

export const editProduct = createAsyncThunk('product/editProduct', async (data) => {
    console.log("data..........");
    console.log(data);
    const { id } = data
    console.log("id............");
    console.log(id);
    const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/product/${id}`, data)
    return res.data
})




const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.fulfilled, (state, action) => {
                state.productList.push(action.payload)
            })
            .addCase(viewProduct.fulfilled, (state, action) => {
                console.log(action.payload);
                state.productList = action.payload
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const id = action.payload
                const new_Data = state.productList.filter((product) => {
                    return product.id !== id
                })
                state.productList = new_Data
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                const id = action.payload

                const index_number = state.productList.find((product) => {
                    return product.id == id
                })
                if (index_number != -1) {
                    state.productList[index_number] = action.payload
                }
            })

    }
})

export default ProductSlice.reducer