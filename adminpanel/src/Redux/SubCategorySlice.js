import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    subcategoryList: [],
}

export const addsubcategory = createAsyncThunk('subcategory/addsubcategory', async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/subcategory`, data)
    return data
})

export const viewsubcategory = createAsyncThunk('subcategory/viewsubcategory', async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/subcategory`)
    // console.log("res",res)
    return res.data.Subcategory
})

export const deletesubcategory = createAsyncThunk('subcategory/deletesubcategory', async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/subcategory/${id}`)
    return id
})
export const editsubcategory = createAsyncThunk('subcategory/editsubcategory', async (data) => {
    const { _id } = data
    console.log(_id)
    const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/subcategory/${_id}`, data)
    return res.Subcategory
})

const CategorySlice = createSlice({
    name: "subcategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addsubcategory.fulfilled, (state, action) => {
                state.subcategoryList.push(action.payload)
            })
            .addCase(viewsubcategory.fulfilled, (state, action) => {
                console.log(action.payload);
                state.subcategoryList = action.payload
            })
            .addCase(deletesubcategory.fulfilled, (state, action) => {
                const id = action.payload

                const new_Data = state.subcategoryList.filter((product) => {
                    return product._id !== id
                })
                state.subcategoryList = new_Data
            })
            .addCase(editsubcategory.fulfilled, (state, action) => {
                const id = action.payload

                const index_number = state.subcategoryList.find((product) => {
                    return product._id == id
                })
                if (index_number != -1) {
                    state.subcategoryList[index_number] = action.payload
                }
            })
    }
})

export default CategorySlice.reducer