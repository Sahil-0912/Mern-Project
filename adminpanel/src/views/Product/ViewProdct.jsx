import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTableDataCell,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, viewProduct } from '../../Redux/ProductSlice'
import { FaTrash } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { FaPencil } from 'react-icons/fa6'
import { viewCategory } from '../../Redux/CategorySlice'
import { viewsubcategory } from '../../Redux/SubCategorySlice'

const ViewProduct = () => {
    const { productList } = useSelector((state) => state.products)
    console.log("productList..............");
    console.log(productList);
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(viewCategory())
        dispatch(viewsubcategory())
        dispatch(viewProduct())
    }, [dispatch])


    function trash(id) {
        dispatch(deleteProduct(id))
        alert("delete....")
        location.reload()
    }

    return (
        <div>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader className='bg-dark text-light'>
                            <strong>View Product</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CTable striped borderColor='danger' bordered>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">SR No</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Product Price</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Product Quantity</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Product Category</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Product Sub Cat</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Product Image</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {productList?.map((products, index) => (
                                        <CTableRow key={index}>
                                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                            <CTableDataCell>{products?.product_name}</CTableDataCell>
                                            <CTableDataCell>{products?.product_price}</CTableDataCell>
                                            <CTableDataCell>{products?.product_quan}</CTableDataCell>
                                            <CTableDataCell>{products?.category?.cat_name}</CTableDataCell>
                                            <CTableDataCell>{products?.sub_cat?.sub_cat}</CTableDataCell>
                                            <CTableDataCell><img src={products.product_img} className='w-25 h-25' /></CTableDataCell>
                                            <CTableDataCell>
                                                <div className="d-flex">
                                                    <button className='btn btn-danger' onClick={() => trash(products._id)}><FaTrash /></button>
                                                    <NavLink to={`/Product/UpdateProduct/${products._id}`}>
                                                        <button className='btn btn-warning mx-3'><FaPencil /></button>
                                                    </NavLink>
                                                </div>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default ViewProduct
