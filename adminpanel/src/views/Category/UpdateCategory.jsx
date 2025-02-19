import { CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'
import React, { useEffect } from 'react'
import { DocsComponents, DocsExample } from 'src/components'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editcategory } from '../../Redux/CategorySlice'

const UpdateCategory = () => {
    const { categoryList } = useSelector((state) => state.categories)
    const { id } = useParams()
    const { register, handleSubmit,reset } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(categoryList)

    useEffect(() => {
        const single_user = categoryList?.category?.find((category) => {
            return category._id == id
        })
       reset(single_user);
    }, [])

    function productData(data) {
    
        dispatch(editcategory(data))
        alert("Updated....")
        navigate('/Category/ViewCategory')
    }
  return (
    <div>
         <CRow>
      <CCol xs={12}>
        <DocsComponents href="forms/form-control/" />
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Update Category</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="forms/form-control">
              <CForm method="post" onSubmit={handleSubmit(productData)}>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Product Category</CFormLabel>
                  <CFormInput
                    type="text"
                    id="exampleFormControlInput1"
                    placeholder="Enter Product Category"
                    {...register('cat_name', { required: true })}
                  />
                </div>
                <button className="btn btn-outline-warning" type="submit">
                  Update
                </button>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </div>
  )
}

export default UpdateCategory
