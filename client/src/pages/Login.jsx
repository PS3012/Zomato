import { useEffect, useState } from "react"
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosReq from "../axios.config";
import { loginUser } from "../store/auth.slice";

function Login() {
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const [searchParams] = useSearchParams();
     const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
     const initialData = { email: "", password: "" }
     const [data, setData] = useState(initialData)
     useEffect(() => {
          if (isAuthenticated) {
               const referer = searchParams.get("referer");
               if (referer) navigate(referer);
          }
     }, [isAuthenticated, navigate, searchParams]);
     const handleDataChange = (e) => {
          const { name, value } = e.target
          setData(prev => ({ ...prev, [name]: value }))
     }
     const handleSubmit = async () => {
          if (!data.email) {
               toast.error("Enter valid email")
          } else if (!data.password) {
               toast.error("Enter password")
          } else {
               try {
                    const res = await axiosReq.post("/user/login", data)
                    console.log(res)
                    if (res.status === 200) {
                         dispatch(loginUser(res.data))
                         toast.success("User login successfully.")
                         navigate("/")
                    }
               } catch (error) {
                    console.error(error);
                    toast.error(error.response.data.message)
               }
          }
     }
     return (
          <>

               <div className="bg-gray-100 text-gray-900 flex justify-center py-12">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 bg-white">
                         <div className="mt-6 flex flex-col items-center">
                              <h1 className="text-2xl xl:text-3xl font-bold">Login</h1>
                              <div className="w-full flex-1 mt-8">
                                   <div className="mx-auto max-w-xs">
                                        <input
                                             type="email" placeholder="Email" name="email" value={data.email} onChange={handleDataChange}
                                             className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        />
                                        <input
                                             type="password" placeholder="Password" name="password" value={data.password} onChange={handleDataChange}
                                             className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        />
                                        <button onClick={handleSubmit}
                                             className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                             <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                                  strokeLinecap="round" strokeLinejoin="round">
                                                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                  <circle cx="8.5" cy="7" r="4" />
                                                  <path d="M20 8v6M23 11h-6" />
                                             </svg>
                                             <span className="ml-3">Log In</span>
                                        </button>
                                        <p className="mt-6 text-xs text-gray-600 text-center">
                                             I agree to abide by zomato&nbsp;<a href="#" className="border-b border-gray-500 border-dotted">Terms of Service</a>&nbsp;and its&nbsp;<a href="#" className="border-b border-gray-500 border-dotted">Privacy Policy</a>
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

          </>
     )
}

export default Login
