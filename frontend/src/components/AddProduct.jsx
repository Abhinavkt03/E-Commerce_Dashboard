import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const collectData = async () => {

        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        };
        console.warn(name, price, category, company);
        const users = JSON.parse(localStorage.getItem('users'));
        const user_id = users._id;
        // console.warn(users._id);
        let response = await fetch('http://localhost:5000/add-products', {
            method: "POST",
            body: JSON.stringify({ name: name, price: price, category: category, userId: user_id, company: company }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        let res = await response.json();
        console.warn(res);
        navigate('/');
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <>
            <div className='add_products_form'>
                <h1>Add Product</h1>
                <div className="input">
                    <input className='inputBox' type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Your Name' />
                    {error && !name && <span className='error'>Please Enter Valid Name</span>}
                </div>
                <div className="input">
                    <input className='inputBox' type="text" value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder='Enter Your price' />
                    {error && !price && <span className='error'>Please Enter Valid Price</span>}
                </div>
                <div className="input">
                    <input className='inputBox' type="text" value={category} onChange={(e) => { setCategory(e.target.value) }} placeholder='Enter Your Category' />
                    {error && !category &&  <span className='error'>Please Enter Valid Category</span>}
                </div>
                <div className="input">
                    <input className='inputBox' type="text" value={company} onChange={(e) => { setCompany(e.target.value) }} placeholder='Enter Your Company' />
                    {error && !company &&  <span className='error'>Please Enter Valid Company</span>}
                </div>
                <div className="button">
                    <button onClick={collectData} className='addProduct_button' type="button">Add Product</button>
                </div>
            </div>

        </>
    )
}