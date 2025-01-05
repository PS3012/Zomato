import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import instance from "../axios.config";

const VerifyMail = () => {
     const location = useLocation();
     const navigate = useNavigate();
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const params = new URLSearchParams(location.search);
          const token = params.get("token");
          const sendTokenToBackend = async (token) => {
               try {
                    const res = await instance.post("/auth/verify-token", { token });

                    if (res.status === 200) {
                         toast.success("Your email has been successfully verified!");
                         setTimeout(() => navigate("/login"), 3000);
                    } else {
                         toast.error(res.data.message || "Token not found.");
                    }
               } catch (error) {
                    toast.error(error.response?.data?.message || "Token expired or invalid.");
               } finally {
                    setLoading(false);
               }
          };
          if (!token) {
               toast.error("The verification token is missing. Please check your email.");
               setLoading(false);
          } else {
               sendTokenToBackend(token);
          }
     }, [location.search, navigate]);

     return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
               <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                    {loading ? (
                         <div className="text-center">
                              <h2 className="text-xl font-semibold text-blue-600">Verifying your email...</h2>
                              <p className="mt-2 text-gray-600">Please wait while we verify your email address.</p>
                              <div className="mt-4">
                                   <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin"></div>
                              </div>
                         </div>
                    ) : (
                         <div className="text-center">
                              <h2 className="text-lg font-semibold text-gray-800">
                                   Return to <Link to="/" className="text-blue-600 underline">Home</Link>.
                              </h2>
                         </div>
                    )}
               </div>
          </div>
     );
};

export default VerifyMail;
