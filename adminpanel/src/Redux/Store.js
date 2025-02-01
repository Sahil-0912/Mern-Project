import { configureStore } from "@reduxjs/toolkit"
import productReducer from '../Redux/ProductSlice'
import categoryRedcucer from '../Redux/CategorySlice'
const Store = configureStore({
    reducer:{
        products:productReducer,
        categories:categoryRedcucer
    }
})


export default Store