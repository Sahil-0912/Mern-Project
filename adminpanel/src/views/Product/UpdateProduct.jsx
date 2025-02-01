import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
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
import { DocsComponents, DocsExample } from 'src/components'
import { useForm } from 'react-hook-form'
import { func } from 'prop-types'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editProduct, viewProduct } from '../../Redux/ProductSlice'
import axios from 'axios'
import { Bounce, toast } from 'react-toastify'
import { viewCategory } from '../../Redux/CategorySlice'
const UpdateProduct = () => {
    const { productList } = useSelector((state) => state.products)
    const { categoryList } = useSelector((state) => state.categories)

    const { id } = useParams()
    const { register, handleSubmit, reset } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // useEffect(() => {
    //     const single_user = productList.find((product) => {
    //         return product.id == id
    //     })
    //     reset(single_user);
    // }, [])

    // function productData(data) {
    //     console.log(data);
    //     dispatch(editProduct(data))
    //     alert("Updated....")
    //     navigate('/Product/ViewProduct')
    // }
    // const productData = async (data) => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('file', data.proimage[0]);
    //         formData.append('upload_preset', 'AdminPanel');
    //         formData.append('cloud_name', 'dlubn6dax');

    //         const cloudinaryResponse = await axios.post(
    //             'https://api.cloudinary.com/v1_1/dlubn6dax/image/upload',
    //             formData
    //         );

    //         const payload = {
    //             id:single_user.id,
    //             proname: data.proname,
    //             procat: data.procat,
    //             proqun: data.proqun,
    //             proprice: data.proprice,
    //             prodesc: data.prodesc,
    //             proimage: cloudinaryResponse.data.secure_url,
    //         };

    //         await axios.post('http://localhost:5000/products', payload);
    //         dispatch(editProduct(payload))
    //         // console.log(payload);

    //         reset();
    //         navigate('/');
    //     } catch (error) {
    //         console.error('Error uploading image:', error);
    //     }

    //     toast.success('🦄 Data has been inserted!', {
    //         position: 'top-right',
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: 'light',
    //         transition: Bounce,
    //     })
    // }

    const categories = categoryList?.map((category) => {
        return category.procat
    })
    console.log("categories...........");

    console.log(categories);

    const uniqueCategories = new Set(categories)
    console.log("uniqueCategories.........");
    console.log(uniqueCategories);

    const singleProduct = productList.find((ele) => {
        return ele.id == id
    })
    console.log('sin', singleProduct)

    useEffect(() => {
        dispatch(viewProduct())
        dispatch(viewCategory())
        reset(singleProduct)
    }, [dispatch])

    const Update = async (data) => {

        try {
            const formData = new FormData()
            formData.append('file', data.proimage[0])
            formData.append('upload_preset', 'AdminPanel')
            formData.append('cloud_name', 'dlubn6dax')

            const cloudinaryResponse = await axios.post(
                'https://api.cloudinary.com/v1_1/dlubn6dax/image/upload',
                formData,
            )

            const payload = {
                id: singleProduct.id,
                proname: data.proname,
                procat: data.procat,
                proqun: data.proqun,
                proprice: data.proprice,
                prodesc: data.prodesc,
                proimage: cloudinaryResponse.data.secure_url,
            }
            // console.log("payload",payload);

            dispatch(editProduct(payload))
            navigate('/Product/ViewProduct')
            reset()
        } catch (error) {
            console.error('Error uploading image:', error)
        }
    }

    return (
        <div>
            <cRow>
                <CCol xs={12}>
                    <DocsComponents href="forms/form-control/" />
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Update Product</strong>
                        </CCardHeader>
                        <CCardBody>
                            <DocsExample href="forms/form-control">
                                <CForm method='post' onSubmit={handleSubmit(Update)}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlInput1">Product Name</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            id="exampleFormControlInput1"
                                            placeholder="Enter Product Name"
                                            {...register('proname')}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlInput1">Product Price</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            id="exampleFormControlInput1"
                                            placeholder="Enter Product Price"
                                            {...register('proprice')}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlInput1">Product Quantity</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            id="exampleFormControlInput1"
                                            placeholder="Enter Product Quantity"
                                            {...register('proqun')}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlTextarea1">Product Description</CFormLabel>
                                        <CFormTextarea id="exampleFormControlTextarea1" rows={3} {...register('prodesc')}></CFormTextarea>
                                    </div>
                                    <div>
                                        <CFormLabel>Product Category</CFormLabel>
                                        <CFormSelect
                                            aria-label="Default select example"
                                            // onChange={(e) => setCategory(e.target.value)}
                                            {...register('procat')}
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
                                            {...register('proimage', { required: 'Please select an image file.' })} // Register the file input
                                            id="image"
                                            type="file"
                                            accept="image/"
                                        />
                                    </div>
                                    <button className='btn btn-outline-warning'>Update</button>
                                </CForm>
                            </DocsExample>
                        </CCardBody>
                    </CCard>
                </CCol>
            </cRow>
        </div>
    )
}

export default UpdateProduct
