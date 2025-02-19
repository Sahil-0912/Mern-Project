import React, { useEffect } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CRow,
} from '@coreui/react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { addsubcategory, editsubcategory, viewsubcategory } from '../../Redux/SubCategorySlice';
import { viewCategory } from '../../Redux/CategorySlice';
import { useNavigate } from 'react-router-dom';

const UpdateSubCategory = () => {
    const { categoryList } = useSelector((state) => state.categories)
    console.log(categoryList)

  

    const { id } = useParams()
    const { register, handleSubmit, reset } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const single_user = categoryList?.category?.find((category) => {
            return category._id == id
        })
        reset(single_user);
    }, [])

 
    function Subcatdata(data) {
        dispatch(editsubcategory(data))
        alert("Updated....")
        navigate('/SubCategory/ViewSubCategory')
    }

    useEffect(() => {
        dispatch(viewCategory());
    }, [dispatch]);

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader className='bg-dark text-light'>
                        <strong>Add Sub Category</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm method="post" onSubmit={handleSubmit(Subcatdata)}>
                            <div className="mb-3">
                                <CFormLabel>Category</CFormLabel>
                                <CFormSelect
                                    aria-label="Default select example"
                                    {...register('category', { required: 'Category is required.' })}
                                >
                                    <option value="">Select a category</option>
                                    {categoryList?.category?.map((cat, index) => (
                                        <option key={index} value={cat._id}>
                                            {cat.cat_name}
                                        </option>
                                    ))}
                                </CFormSelect>
                                {errors.category && <span className="text-danger">{errors.category.message}</span>}
                            </div>
                            <div className="mb-3">
                                <CFormLabel htmlFor="exampleFormControlInput1">Sub Category</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="exampleFormControlInput1"
                                    placeholder="Enter Sub Category"
                                    {...register('sub_cat', { required: 'Sub Category name is required.' })}
                                />
                                {errors.sub_cat && <span className="text-danger">{errors.sub_cat.message}</span>}
                            </div>
                            <button className="btn btn-outline-success my-3" type="submit">
                                Submit
                            </button>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default UpdateSubCategory;
