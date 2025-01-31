import { Helmet } from "react-helmet-async";
import Heading from "../components/shared/Heading";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const GiveFund = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

    return (
        <div className="container mx-auto mt-10 mb-28">
            <Helmet>
                <title>Rokto Bondhon | Funding Page</title>
            </Helmet>
            <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
                <Heading subtitle="Give Fund" title="Funding" />

                <div>
                    <Elements stripe={stripePromise}>
                        <form >
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
                            <button
                                className="btn btn-sm btn-primary my-4"
                                type="submit"
                                // disabled={!stripe || !clientSecret}
                            >
                                Pay
                            </button>
                            {/* <p className="text-red-600">{error}</p> */}
                            {/* {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>} */}
                        </form>

                    </Elements>
                </div>

            </div>
        </div>
    );
};

export default GiveFund;