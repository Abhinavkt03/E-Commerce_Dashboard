import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        productList();
    }, []);

    const productList = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers: {
                authorization: JSON.parse(localStorage.getItem('token')),
            },
        });
        result = await result.json();
        setProducts(result);
    };

    const searchProducts = async (e) => {
        const key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            productList();
        }
    };

    const deleteProduct = async (id) => {
        // console.log(id);
        let response = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'Delete',
        });
        console.log(response);
        if (response) {
            productList();
        }
    };
    // console.warn("product",products);
    return (
        <>
            <div className='product-list'>
                <h1>Product List</h1>
                <input type="search" placeholder='search product' className='search-product' onChange={searchProducts} />
                <ul className='product-list-heading'>
                    <li>S.No</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li>Category</li>
                    <li>Company</li>
                    <li className='operations'>Operations</li>
                </ul>
                {
                    products.length > 0 ? products.map((item, index) => {
                        return <ul>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>{item.price}</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li className='operations'><button className='deleteButton' onClick={() => deleteProduct(item._id)}>Delete</button>
                                <Link to={`/update/${item._id}`}>Update</Link>
                            </li>
                        </ul>
                    })
                        : <h1>No Result Found</h1>
                }
            </div >
        </>
    )
}