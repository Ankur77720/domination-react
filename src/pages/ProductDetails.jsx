import React from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'


function ProductDetails() {


    const location = useLocation()
    const product = location.state.product
    return (

        <main
            className='flex justify-center items-center h-screen text-white'

        >
            <div
                className='flex w-[300px] flex-col justify-center p-2 rounded-lg bg-slate-900'
            >
                <img
                    className='w-full max-h-[200px] object-cover'
                    src={product.images[ 0 ]} alt={product.name} />
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>{product.price}</p>

                <button
                    className='bg-blue-500 text-white p-2 rounded-md'
                >
                    Buy now
                </button>
            </div>
        </main>

    )
}

export default ProductDetails