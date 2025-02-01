import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert'; // Import swal
import { addCategory } from '../../Redux/CategorySlice';

const AddCategory = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(addCategory(data));
    swal({
      title: "Category Added",
      text: "The category has been successfully added!",
      icon: "success",
      button: "OK",
    });
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className='bg-dark text-light'>
            <strong>Add Category</strong>
          </CCardHeader>
          <CCardBody>
            <CForm method="post" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Product Category</CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput1"
                  placeholder="Enter Product Category"
                  {...register('cat_name', { required: 'Category name is required.' })}
                />
                {errors.procat && <span className="text-danger">{errors.procat.message}</span>}
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

export default AddCategory;
