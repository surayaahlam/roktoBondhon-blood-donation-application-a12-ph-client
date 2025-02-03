import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [amount, setAmount] = useState(0);
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxios();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (amount > 0) {
            getPaymentIntent();
        };
    }, [amount])

    const getPaymentIntent = async () => {
        await axiosPublic.post('/create-payment-intent', { fundAmount: amount })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const fundAmount = form.amount.value;

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const fund = {
                    name: user.displayName,
                    email: user.email,
                    fundAmount,
                    transactionId: paymentIntent.id,
                    fundingDate: new Date()
                }

                const res = await axiosSecure.post('/give-fund', fund);
                if (res.data?.insertedId) {
                    form.reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for your generous contribution!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    navigate('/funding');
                }

            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className="mt-6 flex flex-col md:flex-row gap-4 items-center">
                <input
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                    name="amount"
                    placeholder="Type your amount"
                    className={`input input-bordered border-primary w-full md:3/4`} />
                <div className="md:w-1/4">
                    <button
                        className="btn bg-primary border-none text-white hover:bg-secondary text-sm uppercase px-7"
                        type="submit"
                        disabled={!stripe || !clientSecret}
                    >
                        Give Fund
                    </button>
                </div>
            </div>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;