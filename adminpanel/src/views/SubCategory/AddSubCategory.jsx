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
import { addsubcategory } from '../../Redux/SubCategorySlice';
import { viewCategory } from '../../Redux/CategorySlice';

const AddSubCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const { categoryList } = useSelector((state) => state.categories);
    console.log(categoryList?.category);

    const onSubmit = (data) => {
        console.log(data);
        dispatch(addsubcategory(data));
        swal({
            title: "Category Added",
            text: "The sub-category has been successfully added!",
            icon: "success",
            button: "OK",
        });
    };

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
                        <CForm method="post" onSubmit={handleSubmit(onSubmit)}>
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

export default AddSubCategory;
