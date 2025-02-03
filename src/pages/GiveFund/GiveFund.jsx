import { Helmet } from "react-helmet-async";
import Heading from "../../components/shared/Heading";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const GiveFund = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

    return (
        <div className="container mx-auto mt-10 mb-28">
            <Helmet>
                <title>Rokto Bondhon | Give Fund</title>
            </Helmet>
            <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
                <Heading subtitle="Give Fund" title="Support Our Mission with Your Generous Contribution!" />

                <div className="md:w-9/12 lg:8/12 mx-auto mt-6 p-3 md:p-6 bg-base-200">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm></CheckoutForm>
                    </Elements>
                </div>

            </div>
        </div>
    );
};

export default GiveFund;