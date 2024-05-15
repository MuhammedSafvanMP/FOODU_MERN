// Update.js

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Update() {
    const [result, setResult] = useState({});
    const [price, setPrice] = useState(Number);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(Number);
    const { id } = useParams();
    const navigate = useNavigate();



    const productFind = async () => {
        try {
            const jwtToken = localStorage.getItem("adminToken");
            if (!jwtToken) {
                toast.error("Token is not available");
                return;
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: jwtToken,
                },
            };
            const response = await axios.get(`http://localhost:3028/api/admin/products/${id}`, config);
            if (response.status === 200)
                setResult(response.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        productFind();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const jwtToken = localStorage.getItem("adminToken");
            if (!jwtToken) {
                toast.error("Token is not available");
                return;
            }
    
            const formData = new FormData();
            formData.append("title", title );
            formData.append("price", price );
            formData.append("stock", stock );
            formData.append("category", category );
            formData.append("description", description );
            formData.append("image", image);
    
    
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: jwtToken,
                },
            };
    
            const response = await axios.put(`http://localhost:3028/api/admin/products/edit/${id}`, formData, config);
            if (response.status === 200) {
                toast.success("Product successfully updated");
                navigate('/products');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    
    return (
        <form className='container' onSubmit={(e) => handleUpdate(e)} >
            <div className="mb-3">
                <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} placeholder={result.title} />
            </div>
            <div className="mb-3">
                <input type="number" className="form-control" onChange={(e) => setPrice(e.target.value)} placeholder={result.price} />
            </div>
            <div className="mb-3">
                <input type="number" className="form-control" onChange={(e) => setStock(e.target.value)} placeholder={result.stock} />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" onChange={(e) => setCategory(e.target.value)} placeholder={result.category} />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" onChange={(e) => setDescription(e.target.value)} placeholder={result.description} />
            </div>
            <div className="mb-3 d-flex ">
                <img src={result.productImg} width={"140px"} alt="Product" />
                <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} placeholder="Image url" />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    );
}
