import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // requset interseptor to add authorization header for evry secure call to the api

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      // console.log("requset by intersrptors", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },

    function (error) {
      // Do something with requst error
      return Promise.reject(error);
    }
  );

  // interseptors 401 and 403 status

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },

    async (error) => {
      const status = error.response.status;
      // console.log("status error in the interseptors", status);

      // for 401 and 403 logout the user add move the user to the login
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
