import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    const getProductDetails = async ()=>{
        let response = await fetch(`http://localhost:5000/product/${params.id}`);
        response = await response.json();
        console.log(response);
        setName(response.name);
        setPrice(response.price);
        setCategory(response.category);
        setCompany(response.company);
    };

    useEffect(()=>{
        getProductDetails();
    },[]);

    const collectData = async () => {
        console.warn(name, price, category, company);
        let response = await fetch(`http://localhost:5000/product/${params.id}`,{
            method: "PUT",
            body: JSON.stringify({name,price,category,company}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        console.log(response);
        navigate('/');
    };

    return (
        <>
            <div className='update_products_form'>
                <h1>Update Product</h1>
                <div className="input">
                    <input className='inputBox' type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Your Name' />
                </div>

                <div className="input">
                    <input className='inputBox' type="text" value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder='Enter Your price' />
                </div>

                <div className="input">
                    <input className='inputBox' type="text" value={category} onChange={(e) => { setCategory(e.target.value) }} placeholder='Enter Your Category' />
                </div>

                <div className="input">
                    <input className='inputBox' type="text" value={company} onChange={(e) => { setCompany(e.target.value) }} placeholder='Enter Your Company' />
                </div>

                <div className="button">
                    <button onClick={collectData} className='updateProduct_button' type="button">Update Product</button>
                </div>
            </div>
        </>
    )
}