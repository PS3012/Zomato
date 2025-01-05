import { useState } from "react"
import toast from 'react-hot-toast';
import axiosReq from "../axios.config";

function Register() {
     const initialData = { name: "", email: "", mobile: "", password: "" }
     const [data, setData] = useState(initialData)
     const handleDataChange = (e) => {
          const { name, value } = e.target
          setData(prev => ({ ...prev, [name]: value }))
     }
     const handleSubmit = async () => {
          if (!data.name) {
               toast.error("Enter full name")
          } else if (!data.email) {
               toast.error("Enter valid email")
          } else if (!data.mobile) {
               toast.error("Enter mobile number")
          } else if (!data.password) {
               toast.error("Enter password")
          } else {
               try {
                    const res = await axiosReq.post("/user/register", data)
                    console.log(res)
                    if (res.status === 201) {
                         toast.success("Registered successfully. Verify your email by clicking on the link we have send you through mail id.")
                         setData(initialData)
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
                              <h1 className="text-2xl xl:text-3xl font-bold">Register</h1>
                              <div className="w-full flex-1 mt-8">
                                   <div className="mx-auto max-w-xs">
                                        <input
                                             type="text" placeholder="Full Name" name="name" value={data.name} onChange={handleDataChange}
                                             className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        />
                                        <input
                                             type="email" placeholder="Email" name="email" value={data.email} onChange={handleDataChange}
                                             className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        />
                                        <input
                                             type="number" placeholder="Mobile Number" name="mobile" value={data.mobile} onChange={handleDataChange}
                                             className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
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
                                             <span className="ml-3">Register</span>
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

export default Register
