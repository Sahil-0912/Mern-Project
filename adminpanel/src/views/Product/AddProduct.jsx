import React, { useEffect, useState } from 'react'
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
} from '@coreui/react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../Redux/ProductSlice'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { viewCategory } from '../../Redux/CategorySlice'
import { viewsubcategory } from '../../Redux/SubCategorySlice'

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { categoryList } = useSelector((state) => state.categories)
  // console.log(categoryList)

  const [category,setCategory] = useState("")
  
  console.log("category........",category);
  
  const { subcategoryList } = useSelector((state) => state.subcategories)
  // console.log("subcategoryList................");
  // console.log(subcategoryList);

  // const filterCategory = subcategoryList?.filter((ele) => {
  //   return ele.category._id == product
  // })
  // console.log("filterCategory", filterCategory)


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
        category: data.category,
        sub_cat: data.sub_cat,
        product_quan: data.product_quan,
        product_price: data.product_price,
        product_desc: data.product_desc,
        product_img: cloudinaryResponse.data.secure_url,
      };
      // console.log(payload)

      // await axios.post(`${import.meta.env.VITE_BASE_URL}/product`, payload);
      dispatch(addProduct(payload))
      dispatch(viewCategory())
      dispatch(viewsubcategory())
      // console.log(data);

      reset();
      navigate('/Product/ViewProduct');
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
    dispatch(viewsubcategory())
  }, [dispatch])


  // const categories = categoryList.category?.map((ele) => {
  //   return ele.cat_name
  // })
  // console.log("categories...........");

  // console.log(categories);

  // const subcategories = subcategoryList?.map((ele) => {
  //   return ele.sub_cat
  // })


  // const uniqueCategories = new Set(categories)
  // console.log("uniqueCategories.........");
  // console.log(uniqueCategories);


  // const finalcat = [...uniqueCategories]


  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className='bg-dark text-light'>
              <strong>Add Product</strong>
            </CCardHeader>
            <CCardBody>
              <CForm method="post" onSubmit={handleSubmit(submitdata)}>
                <div>
                  <CFormLabel>Product Category</CFormLabel>
                  <CFormSelect
                    aria-label="Default select example"
                   onChange={(e)=>setCategory(e.target.value)}
                    {...register('category')}
                  >
                    <option value="">Select a category</option>
                    {categoryList?.category?.map((ele, index) => (
                      <option key={index} value={ele._id}>
                        {ele?.cat_name}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
                <div>
                  <CFormLabel>Product Sub Category</CFormLabel>
                  <CFormSelect
                    aria-label="Default select example"
                    {...register('sub_cat')}
                  >
                    <option value="">Select a sub category</option>
                    {subcategoryList?.map((ele, index) => (
                      <option key={index} value={ele._id}>
                        {ele?.sub_cat}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="productName">Product Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="productName"
                    placeholder="Enter Product Name"
                    {...register('product_name', { required: true })}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="productPrice">Product Price</CFormLabel>
                  <CFormInput
                    type="number"
                    id="productPrice"
                    placeholder="Enter Product Price"
                    {...register('product_price', { required: true })}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="productQuantity">Product Quantity</CFormLabel>
                  <CFormInput
                    type="number"
                    id="productQuantity"
                    placeholder="Enter Product Quantity"
                    {...register('product_quan', { required: true })}
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

                <div className="mb-3">
                  <label htmlFor="image">Upload Image</label>
                  <input
                    {...register('product_img', { required: 'Please select an image file.' })} // Register the file input
                    id="image"
                    type="file"
                    accept="image/"
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
  )
}

export default AddProduct
