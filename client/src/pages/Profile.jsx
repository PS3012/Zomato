import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axiosReq from "../axios.config"

function Profile() {
     const [data, setData] = useState({ name: "", email: "", mobile: "", gender: "", address: "", city: "", pinCode: "" })
     const [passData, setPassData] = useState({ oldPass: "", newPass: "", conPass: "" })
     const handleUpdateProfileData = (e) => {
          const { name, value } = e.target
          setData(prev => ({ ...prev, [name]: value }))
     }
     const handleUpdatePasswordData = (e) => {
          const { name, value } = e.target
          setPassData(prev => ({ ...prev, [name]: value }))
     }
     useEffect(() => {
          const fetchProfile = async () => {
               try {
                    const response = await axiosReq.get("/user/profile")
                    if (response.status === 200) {
                         setData(response.data.user)
                    }
               } catch (error) {
                    console.error("Error fetching profile", error)
               }
          }
          fetchProfile()
     }, [])
     const handleSubmitProfileData = async () => {
          if (!data.name) {
               toast.error("Enter full name")
          } else if (!data.email) {
               toast.error("Enter valid email")
          } else if (!data.mobile) {
               toast.error("Enter mobile number")
          } else {
               try {
                    const response = await axiosReq.put("/user/profile", data)
                    if (response.status === 200) {
                         toast.success("Profile Updated successfully")
                    } else {
                         toast.error(response.data.message)
                    }
               } catch (error) {
                    console.error(error);
                    toast.error(error.response.data.message)
               }
          }
     }
     const handleChangePassword = async () => {
          if (!passData.oldPass) {
               toast.error("Old Password cannot be empty.")
          } else if (!passData.newPass) {
               toast.error("New Password cannot be empty.")
          } else if (!passData.conPass) {
               toast.error("Confirm Password cannot be empty.")
          } else if (passData.newPass !== passData.conPass) {
               toast.error("New password and confirm password should be same.")
          } else if (passData.oldPass === passData.newPass) {
               toast.error("Old Password and New Password cannot be same.")
          } else {
               try {
                    const response = await axiosReq.put("/user/update-password", { oldPass: passData.oldPass, newPass: passData.newPass })
                    if (response.status === 200) {
                         toast.success("Password Updated successfully")
                         setPassData({ oldPass: "", newPass: "", conPass: "" })
                    } else {
                         toast.error(response.data.message)
                    }
               } catch (error) {
                    console.error(error);
                    toast.error(error.response.data.message)
               }
          }
     }
     return (
          <>

               <section className="py-7">
                    <div className="mx-auto max-w-7xl grid grid-cols-3 gap-4 items-start">
                         <div className="bg-slate-100 p-4 col-span-2">
                              <div className="text-xl font-semibold mb-4 border-b pb-2 border-zinc-400">User Profile</div>
                              <div className="grid grid-cols-2 gap-4">
                                   <div>
                                        <label className="text-sm font-semibold block mb-1">Name</label>
                                        <input
                                             type="text" name="name" value={data.name} onChange={handleUpdateProfileData}
                                             className="block w-full px-3 py-1 text-sm bg-transparent border bg-slate-50 border-zinc-400 rounded focus:bg-white focus:outline-none"
                                        />
                                   </div>
                                   <div>
                                        <label className="text-sm font-semibold block mb-1">E-Mail Address</label>
                                        <input
                                             type="email" name="email" value={data.email} readOnly
                                             className="block w-full px-3 py-1 text-sm bg-transparent border bg-slate-100 border-zinc-400 rounded focus:outline-none"
                                        />
                                   </div>
                                   <div>
                                        <label className="text-sm font-semibold block mb-1">Mobile Number</label>
                                        <input
                                             type="number" name="mobile" value={data.mobile} readOnly
                                             className="block w-full px-3 py-1 text-sm bg-transparent border bg-slate-100 border-zinc-400 rounded focus:outline-none"
                                        />
                                   </div>
                                   <div>
                                        <label className="text-sm font-semibold block mb-1">Gender</label>
                                        <select
                                             name="gender" value={data.gender} onChange={handleUpdateProfileData}
                                             className="block w-full px-3 py-1 text-sm bg-transparent border bg-slate-50 border-zinc-400 rounded focus:bg-white focus:outline-none"
                                        >
                                             <option value="">-- Select Gender --</option>
                                             <option value="male">Male</option>
                                             <option value="female">Female</option>
                                             <option value="other">Other</option>
                                        </select>
                                   </div>
                                   <div className="col-span-2">
                                        <label className="text-sm font-semibold block mb-1">Address</label>
                                        <input
                                             type="text" name="address" value={data.address} onChange={handleUpdateProfileData}
                                             className="block w-full px-3 py-1 text-sm bg-transparent border bg-slate-50 border-zinc-400 rounded focus:bg-white focus:outline-none"
                                        />
                                   </div>
                                   <div>
                                        <label className="text-sm font-semibold block mb-1">City</label>
                                        <input
                                             type="text" name="city" value={data.city} onChange={handleUpdateProfileData}
                                             className="block w-full px-3 py-1 text-sm bg-transparent border bg-slate-50 border-zinc-400 rounded focus:bg-white focus:outline-none"
                                        />
                                   </div>
                                   <div>
                                        <label className="text-sm font-semibold block mb-1">Pin code</label>
                                        <input
                                             type="number" name="pinCode" value={data.pinCode} onChange={handleUpdateProfileData}
                                             className="block w-full px-3 py-1 text-sm bg-transparent border bg-slate-50 border-zinc-400 rounded focus:bg-white focus:outline-none"
                                        />
                                   </div>
                                   <button onClick={handleSubmitProfileData} className="col-span-2 bg-red-600 text-white px-3 py-2 font-semibold rounded hover:bg-black">Update Profile</button>
                              </div>
                         </div>
                         <div className="bg-slate-100 p-4">
                              <div className="text-xl font-semibold mb-4 border-b pb-2 border-zinc-400">Update Password</div>
                              <div className="grid gap-4">
                                   <div>
                                        <label className="text-sm font-semibold block mb-1">Old Password</label>
                                        <input
                                             type="password" name="oldPass" value={passData.oldPass} onChange={handleUpdatePasswordData}
                                             className="block w-full px-3 py-1 text-sm bg-transparent border bg-slate-50 border-zinc-400 rounded focus:bg-white focus:outline-none"
                                        />
                                   </div>
                                   <div>
                                        <label className="text-sm font-semibold block mb-1">New Password</label>
                                        <input
                                             type="password" name="newPass" value={passData.newPass} onChange={handleUpdatePasswordData}
                                             className="block w-full px-3 py-1 text-sm bg-transparent border bg-slate-50 border-zinc-400 rounded focus:bg-white focus:outline-none"
                                        />
                                   </div>
                                   <div>
                                        <label className="text-sm font-semibold block mb-1">Confirm Password</label>
                                        <input
                                             type="password" name="conPass" value={passData.conPass} onChange={handleUpdatePasswordData}
                                             className="block w-full px-3 py-1 text-sm bg-transparent border bg-slate-50 border-zinc-400 rounded focus:bg-white focus:outline-none"
                                        />
                                   </div>
                                   <button onClick={handleChangePassword} className="bg-red-600 text-white px-3 py-2 font-semibold rounded hover:bg-black">Update Password</button>
                              </div>
                         </div>
                    </div>
               </section>

          </>
     )
}

export default Profile
