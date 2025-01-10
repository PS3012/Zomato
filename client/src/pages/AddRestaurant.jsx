import { useState } from "react"
import toast from "react-hot-toast"
import axiosReq from "../axios.config"
import { useNavigate } from "react-router-dom"

function AddRestaurant() {
     const availableCuisines = ["American", "BBQ", "Breakfast", "Burgers", "Cafe", "Chinese", "Desserts", "French", "Greek", "Healthy", "Indian", "Italian", "Japanese", "Mexican", "Noodles", "Organic", "Pasta", "Pizza"]
     const navigate = useNavigate()
     const initialData = {
          cuisines: [],
          restaurantImage: null,
          menu: [
               { foodName: '', foodPrice: '', foodImage: null },
               { foodName: '', foodPrice: '', foodImage: null }
          ]
     }
     const [data, setData] = useState(initialData)
     const handleDataChange = e => {
          const { name, value } = e.target
          setData(prev => ({ ...prev, [name]: value }))
     }
     const handleCuisineChange = (cuisine) => {
          setData(prev => ({
               ...prev,
               cuisines: prev.cuisines.includes(cuisine)
                    ? prev.cuisines.filter(c => c !== cuisine)
                    : [...prev.cuisines, cuisine]
          }))
     }
     const handleMenuChange = (index, field, value) => {
          setData(prev => ({
               ...prev,
               menu: prev.menu.map((item, i) =>
                    i === index ? { ...item, [field]: value } : item
               )
          }))
     }
     const handleSubmitFirst = async () => {
          if (!data.name) {
               toast.error("Restaurant name is required.")
          } else if (!data.restaurantImage) {
               toast.error("Restaurant image is required.")
          } else if (!data.ownerName) {
               toast.error("Owner name is required.")
          } else if (!data.ownerEmail) {
               toast.error("Owner email address is required.")
          } else if (!data.ownerMobile) {
               toast.error("Owner mobile number is required.")
          } else if (!data.address) {
               toast.error("Restaurant address is required.")
          } else if (!data.city) {
               toast.error("Restaurant city is required.")
          } else if (!data.pinCode) {
               toast.error("Restaurant pin code is required.")
          } else if (data.cuisines.length === 0) {
               return toast.error("Please select at least one cuisine")
          } else if (data.menu.length < 2) {
               return toast.error("Please add at least 2 menu items")
          } else if (data.menu.some(item => !item.foodName || !item.foodPrice || !item.foodImage)) {
               return toast.error("All menu item fields are required")
          } else {
               const formData = new FormData()
               Object.keys(data).forEach(key => {
                    if (key === 'menu') {
                         data.menu.forEach((item, index) => {
                              formData.append(`foodName${index}`, item.foodName)
                              formData.append(`foodPrice${index}`, item.foodPrice)
                              formData.append(`foodImage${index}`, item.foodImage)
                         })
                    } else if (key === 'cuisines') {
                         formData.append('cuisines', JSON.stringify(data.cuisines))
                    } else if (key === 'restaurantImage') {
                         formData.append('restaurantImage', data.restaurantImage)
                    } else {
                         formData.append(key, data[key])
                    }
               })
               try {
                    const response = await axiosReq.post("/restaurant", formData, {
                         headers: { 'Content-Type': 'multipart/form-data' }
                    })
                    if (response.status === 201) {
                         toast.success(response.data.message)
                         navigate("/")
                    } else {
                         toast.error(response.data.message)
                    }
               } catch (error) {
                    console.error(error)
                    toast.error(error.response.data.message)
               }
          }
     }
     const handleAddMenuItem = () => {
          setData(prev => ({
               ...prev,
               menu: [...prev.menu, { foodName: '', foodPrice: '', foodImage: null }]
          }))
     }
     const handleDeleteMenuItem = (indexToDelete) => {
          if (data.menu.length <= 2) {
               return toast.error("Minimum 2 menu items are required")
          }
          setData(prev => ({
               ...prev,
               menu: prev.menu.filter((_, index) => index !== indexToDelete)
          }))
     }
     return (
          <>

               <div className="bg-slate-50">
                    <div className="grid grid-cols-3 gap-5 items-start p-4 max-w-7xl mx-auto">
                         <div className="bg-white rounded-xl sticky top-[20px]">
                              <div className="py-3 px-4 border-b text-xl font-semibold border-slate-500">Complete Your Registration</div>
                              <div className="p-4">
                                   <div className="flex gap-3 items-center mb-3">
                                        <div className="w-1 bg-red-600 h-12">&nbsp;</div>
                                        <div className="flex-1">
                                             <div className="font-semibold">Restaurant Information</div>
                                             <div className="text-slate-600 text-sm">Name, location and contact number</div>
                                        </div>
                                   </div>
                                   <div className="flex gap-3 items-center">
                                        <div className="w-1 h-12">&nbsp;</div>
                                        <div className="flex-1">
                                             <div className="font-semibold">Menu and operational details</div>
                                             <div className="text-slate-600 text-sm">Restaurant Food and Cuisines</div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className="col-span-2">
                              <div className="text-4xl font-bold mb-3">Restaurant Information</div>
                              <div className="bg-white rounded-xl mb-3">
                                   <div className="p-4 border-b border-slate-200">
                                        <div className="font-semibold text-2xl">Restaurant Name & Image</div>
                                        <div className="text-slate-600">Customers will see this name on Zomato</div>
                                   </div>
                                   <div className="p-4">
                                        <input
                                             type="text" name="name" value={data.name} onChange={handleDataChange}
                                             placeholder="Restaurant Name*" className="w-full px-3 py-2 border border-slate-200 focus:border-blue-600 focus:outline-none rounded-lg mb-3"
                                        />
                                        <input
                                             type="file"
                                             accept="image/*"
                                             onChange={(e) => setData(prev => ({ ...prev, restaurantImage: e.target.files[0] }))}
                                             className="w-full px-3 py-2 border border-slate-200 focus:border-blue-600 focus:outline-none rounded-lg"
                                        />
                                   </div>
                              </div>
                              <div className="bg-white rounded-xl mb-3">
                                   <div className="p-4 border-b border-slate-200">
                                        <div className="font-semibold text-2xl">Owner details</div>
                                        <div className="text-slate-600">Zomato will use these details for all business communications and updates</div>
                                   </div>
                                   <div className="p-4">
                                        <div className="grid grid-cols-2 gap-4">
                                             <input
                                                  type="text" name="ownerName" value={data.ownerName} onChange={handleDataChange}
                                                  placeholder="Full Name*" className="w-full px-3 py-2 border border-slate-200 focus:border-blue-600 focus:outline-none rounded-lg"
                                             />
                                             <input
                                                  type="text" name="ownerEmail" value={data.ownerEmail} onChange={handleDataChange}
                                                  placeholder="E-Mail Address*" className="w-full px-3 py-2 border border-slate-200 focus:border-blue-600 focus:outline-none rounded-lg"
                                             />
                                             <input
                                                  type="text" name="ownerMobile" value={data.ownerMobile} onChange={handleDataChange}
                                                  placeholder="Mobile Number*" className="w-full px-3 py-2 border border-slate-200 col-span-2 focus:border-blue-600 focus:outline-none rounded-lg"
                                             />
                                        </div>
                                   </div>
                              </div>
                              <div className="bg-white rounded-xl mb-3">
                                   <div className="p-4 border-b border-slate-200">
                                        <div className="font-semibold text-2xl">Restaurant Address Details</div>
                                        <div className="text-slate-600">Address details are basis the restaurant location.</div>
                                   </div>
                                   <div className="p-4">
                                        <div className="grid grid-cols-2 gap-4">
                                             <input
                                                  type="text" name="address" value={data.address} onChange={handleDataChange}
                                                  placeholder="Address*" className="w-full px-3 py-2 border border-slate-200 col-span-2 focus:border-blue-600 focus:outline-none rounded-lg"
                                             />
                                             <input
                                                  type="text" name="city" value={data.city} onChange={handleDataChange}
                                                  placeholder="City*" className="w-full px-3 py-2 border border-slate-200 focus:border-blue-600 focus:outline-none rounded-lg"
                                             />
                                             <input
                                                  type="text" name="pinCode" value={data.pinCode} onChange={handleDataChange}
                                                  placeholder="Pin code*" className="w-full px-3 py-2 border border-slate-200 focus:border-blue-600 focus:outline-none rounded-lg"
                                             />
                                        </div>
                                   </div>
                              </div>
                              <div className="bg-white rounded-xl mb-3">
                                   <div className="p-4 border-b border-slate-200">
                                        <div className="font-semibold text-2xl">Cuisines</div>
                                        <div className="text-slate-600">Select the cuisines that your restaurant offers</div>
                                   </div>
                                   <div className="p-4 grid grid-cols-3 gap-2">
                                        {availableCuisines.map((item, idx) =>
                                             <label htmlFor={item} className="flex gap-2 items-center" key={idx}>
                                                  <input type="checkbox" name={item} id={item} checked={data.cuisines.includes(item)} onChange={() => handleCuisineChange(item)} />
                                                  <span>{item}</span>
                                             </label>
                                        )}
                                   </div>
                              </div>
                              <div className="bg-white rounded-xl mb-3">
                                   <div className="p-4 border-b border-slate-200">
                                        <div className="font-semibold text-2xl">Menu</div>
                                        <div className="text-slate-600">Create your restaurant menu</div>
                                   </div>
                                   <div className="p-4">
                                        {data.menu.map((item, index) => (
                                             <div key={index} className="grid grid-cols-5 gap-4 mb-4 relative">
                                                  <input
                                                       type="text"
                                                       placeholder="Food Name*"
                                                       value={item.foodName}
                                                       onChange={(e) => handleMenuChange(index, 'foodName', e.target.value)}
                                                       className="w-full px-3 py-2 border border-slate-200 focus:border-blue-600 focus:outline-none rounded-lg"
                                                  />
                                                  <input
                                                       type="number"
                                                       placeholder="Food Price*"
                                                       value={item.foodPrice}
                                                       onChange={(e) => handleMenuChange(index, 'foodPrice', e.target.value)}
                                                       className="w-full px-3 py-2 border border-slate-200 focus:border-blue-600 focus:outline-none rounded-lg"
                                                  />
                                                  <input
                                                       type="file"
                                                       accept="image/*"
                                                       onChange={(e) => handleMenuChange(index, 'foodImage', e.target.files[0])}
                                                       className="w-full px-3 py-2 border border-slate-200 col-span-2 focus:border-blue-600 focus:outline-none rounded-lg"
                                                  />
                                                  <button
                                                       type="button"
                                                       onClick={() => handleDeleteMenuItem(index)}
                                                       className="bg-red-500 text-white px-3 rounded-lg hover:bg-red-600"
                                                  >
                                                       Delete
                                                  </button>
                                             </div>
                                        ))}
                                        <button
                                             type="button"
                                             onClick={handleAddMenuItem}
                                             className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                        >
                                             Add Food Item
                                        </button>
                                   </div>
                              </div>
                              <div className="flex justify-end">
                                   <button
                                        type="button" onClick={handleSubmitFirst}
                                        className="bg-blue-600 text-white px-4 py-2 font-semibold rounded-xl w-52"
                                   >Submit</button>
                              </div>
                         </div>
                    </div>
               </div>

          </>
     )
}

export default AddRestaurant
