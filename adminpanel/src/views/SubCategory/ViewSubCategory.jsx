import React, { useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableHeaderCell,
    CTableHead,
    CTableRow,
    CTableDataCell,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'
import { deletesubcategory, viewsubcategory } from '../../Redux/SubCategorySlice'

const ViewCategory = () => {
    const { subcategoryList } = useSelector((state) => state.subcategories)
    const dispatch = useDispatch()

    // const subcategories  = categoryList?.data?.Subcategory
    console.log(subcategoryList,"sub")

    useEffect(() => {
        dispatch(viewsubcategory())
    }, [dispatch])

    function trash(id) {
        dispatch(deletesubcategory(id))
        alert("delete....")
    }

    return (
        <div>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader className='bg-dark text-light'>
                            <strong>View Category</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CTable striped bordered borderColor='danger'>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">SRNO</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Category Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Sub Category Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {subcategoryList?.map((ele, index) => (
                                        <CTableRow key={index}>
                                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                            <CTableDataCell>{ele?.category?.cat_name}</CTableDataCell>
                                            <CTableDataCell>{ele.sub_cat}</CTableDataCell>
                                            <CTableDataCell>
                                                <button className='btn btn-danger mx-2' onClick={() => trash(ele._id)}><FaTrash /></button>
                                                <NavLink to={`/Category/UpdateSubCategory/${ele._id}`}>
                                                    <button className='btn btn-warning'><FaPencil /></button>
                                                </NavLink>
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

export default ViewCategory
