import React, { useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../Redux/ProductSlice'
import { viewCategory } from '../../Redux/CategorySlice';


const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm()
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const { categoryList } = useSelector((state) => state.categories)

  const submitdata = async (data) => {
    try {
      const formData = new FormData();
      formData.append('file', data.product_img[0]);
      formData.append('upload_preset', 'AdminPanel');
      formData.append('cloud_name', 'dlubn6dax');

      const cloudinaryResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/dlubn6dax/image/upload',
        formData
      );

      const payload = {
        product_name: data.product_name,
        product_cat: data.product_cat,
        product_quan: data.product_quan,
        product_price: data.product_price,
        product_desc: data.product_desc,
        product_img: cloudinaryResponse.data.secure_url,
      };

      await axios.post(`${import.meta.env.VITE_BASE_URL}/product`, payload);
      dispatch(addProduct(payload))
      // console.log(data);

      reset();
      navigate('/');
    } catch (error) {
      console.error('Error uploading image:', error);
    }

    toast.success('🦄 Data has been inserted!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    })
  }

  useEffect(() => {
    dispatch(viewCategory())
  }, [dispatch])


  const categories = categoryList?.category?.map((category) => {
    return category.product_cat
  })
  console.log("categories...........");

  console.log(categories);

  const uniqueCategories = new Set(categories)
  console.log("uniqueCategories.........");
  console.log(uniqueCategories);




  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="bg-dark text-light">
              <strong>Add Product</strong>
            </CCardHeader>
            <CCardBody>
              <CForm method="post" onSubmit={handleSubmit(submitdata)} encType="multipart/form-data">
                <div className="mb-3">
                  <CFormLabel htmlFor="productName">Product Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="productName"
                    placeholder="Enter Product Name"
                    {...register('product_name')}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="productPrice">Product Price</CFormLabel>
                  <CFormInput
                    type="number"
                    id="productPrice"
                    placeholder="Enter Product Price"
                    {...register('product_price')}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="productQuantity">Product Quantity</CFormLabel>
                  <CFormInput
                    type="number"
                    id="productQuantity"
                    placeholder="Enter Product Quantity"
                    {...register('product_quan')} // Fixed typo
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="productDescription">Product Description</CFormLabel>
                  <CFormTextarea
                    id="productDescription"
                    rows={3}
                    placeholder="Enter Product Description"
                    {...register('product_desc')}
                  ></CFormTextarea>
                </div>

                <div>
                  <CFormLabel>Product Category</CFormLabel>
                  <CFormSelect
                    aria-label="Default select example"
                    // onChange={(e) => setCategory(e.target.value)}
                    {...register('product_cat')}
                  >
                    <option value="">Select a category</option>
                    {[...uniqueCategories]?.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </CFormSelect>
                </div>

                <div className="mb-3">
                  <label htmlFor="image">Upload Image</label>
                  <input
                    {...register('product_img', { required: 'Please select an image file.' })}
                    id="image"
                    type="file"
                    accept="image/*"
                  />
                </div>
                <button className="btn btn-outline-success my-3" type="submit">
                  Submit
                </button>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
