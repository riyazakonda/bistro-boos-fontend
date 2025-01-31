import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import ChakOutForm from "./ChakOutForm";
import Sslpayment from "./Sslpayment";

const Payment = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

  return (
    <div>
      <SectionTitle
        heading="payment"
        subHeading="Please pay to eit"
      ></SectionTitle>
      <Sslpayment></Sslpayment>
      <div className="pt-6">
        <Elements stripe={stripePromise}>
          <ChakOutForm></ChakOutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
