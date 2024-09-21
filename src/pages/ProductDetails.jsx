import React, { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import useRazorpay from "react-razorpay";
import axios from 'axios'


function ProductDetails() {

    const [ Razorpay ] = useRazorpay();
    const location = useLocation()
    const product = location.state.product


    const handlePayment = useCallback(async () => {
        const order = (await axios.get('https://domination-lx2e.onrender.com/user/order/' + product._id, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })).data.order

        const options = {
            key: "rzp_test_cAa3gCF0eP8i4R",
            amount: order.amount,
            currency: order.currency,
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id,
            handler: async (res) => {

                const response = await axios.post('https://domination-lx2e.onrender.com/user/verify/' + order.id, {
                    paymentId: res.razorpay_payment_id, orderId: res.razorpay_order_id, signature: res.razorpay_signature
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })

                console.log(response)

            },


            prefill: {
                name: "Piyush Garg",
                email: "youremail@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
    }, [ Razorpay ]);

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
                    onClick={handlePayment}
                >
                    Buy now
                </button>
            </div>
        </main>

    )
}

export default ProductDetails