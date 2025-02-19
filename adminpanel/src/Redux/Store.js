import { configureStore } from "@reduxjs/toolkit"
import productReducer from '../Redux/ProductSlice'
import categoryRedcucer from '../Redux/CategorySlice'
import subcategoryRedcucer from '../Redux/SubCategorySlice'
const Store = configureStore({
    reducer:{
        products:productReducer,
        categories:categoryRedcucer,
        subcategories:subcategoryRedcucer,
    }
})


export default Store