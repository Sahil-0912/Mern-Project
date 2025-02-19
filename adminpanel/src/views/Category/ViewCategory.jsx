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
import { deleteCategory, viewCategory } from '../../Redux/CategorySlice'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'

const ViewCategory = () => {
    const { categoryList } = useSelector((state) => state.categories)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(viewCategory())
    }, [dispatch])

    function trash(id) {
        dispatch(deleteCategory(id))
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
                                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {categoryList?.category?.map((ele, index) => (
                                        <CTableRow key={index}>
                                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                            <CTableDataCell>{ele.cat_name}</CTableDataCell>
                                            <CTableDataCell>
                                                <button className='btn btn-danger mx-2' onClick={() => trash(ele._id)}><FaTrash /></button>
                                                <NavLink to={`/Category/UpdateCategory/${ele._id}`}>
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
