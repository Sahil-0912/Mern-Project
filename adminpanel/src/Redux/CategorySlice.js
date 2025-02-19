import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    categoryList: [],
}

export const addCategory = createAsyncThunk('category/addCategory', async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/category`, data)
    return res.data
})

export const viewCategory = createAsyncThunk('category/viewCategory', async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/category`)
    return res.data
})

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id) => {

    const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/category/${id}`)
    return id
})
export const editcategory = createAsyncThunk('category/editcategory', async (data) => {
    const { _id } = data
    console.log(_id)
    const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/category/${_id}`, data)
    return res.category
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

                const new_Data = state.categoryList.filter((product) => {
                    return product._id !== id
                })
                state.categoryList = new_Data
            })
            .addCase(editcategory.fulfilled, (state, action) => {
                const id = action.payload

                const index_number = state.categoryList.find((product) => {
                    return product._id == id
                })
                if (index_number != -1) {
                    state.categoryList[index_number] = action.payload
                }
            })
    }
})

export default CategorySlice.reducer