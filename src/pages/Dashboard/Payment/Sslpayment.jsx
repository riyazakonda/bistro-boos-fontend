import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";

const Sslpayment = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const heandleCreatePayment = async () => {
    const payment = {
      email: user.email,

      transctionId: "",
      date: new Date(),
      cartIds: cart.map((item) => item._id),
      menuItems: cart.map((item) => item.menuId),
      stats: "pending",
    };
    const response = await axios.post(
      "http://localhost:5000/create-ssl-payment",
      payment
    );
    if (response.data?.gatewayUrl) {
      window.location.replace(response.data.gatewayUrl);
    }
    console.log("payment", response);
  };

  return (
    <div>
      <form onSubmit={heandleCreatePayment} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Sslpayment;
