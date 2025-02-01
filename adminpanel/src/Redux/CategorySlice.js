import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    categoryList: [],
}

export const addCategory = createAsyncThunk('category/addCategory', async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/category/addcategory`, data)
    return res.data
})

export const viewCategory = createAsyncThunk('category/viewCategory', async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/category/viewcategory`)
    return res.data
})

export const deleteCategory = createAsyncThunk('product/deleteCategory', async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/category/deletecat${id}`)
    return res.data
})

const CategorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCategory.fulfilled, (state, action) => {
                state.categoryList.push(action.payload)
            })
            .addCase(viewCategory.fulfilled, (state, action) => {
                console.log(action.payload);
                state.categoryList = action.payload
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                const id = action.payload

                const new_Data = state.productList.filter((product) => {
                    return product.id !== id
                })
                state.productList = new_Data
            })
    }
})

export default CategorySlice.reducer