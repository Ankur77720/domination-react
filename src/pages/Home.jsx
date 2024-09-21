import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home() {

    const [ products, setProducts ] = useState([])
    const navigate = useNavigate();

    function getProducts() {
        axios.get("https://domination-lx2e.onrender.com/user/products", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            setProducts(res.data.products)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getProducts()
    }, [])


    return (
        <main
            className='w-full h-full text-white p-3'
        >
            <div className="container flex flex-wrap gap-3">
                {products.map((product) => (
                    <div
                        className='p-2 rounded-md bg-slate-800 max-w-[300px] w-full flex flex-col gap-2 '
                        onClick={() => navigate(`/product-details`, {
                            state: {
                                product
                            }
                        })}
                        key={product._id}>

                        <img
                            className='max-h-[200px] aspect-square w-full object-cover'
                            src={product.images[ 0 ]} alt="" />


                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>

        </main>
    )
}

export default Home