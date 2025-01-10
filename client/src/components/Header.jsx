import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom"
import { logout } from "../store/auth.slice.js"
import { useState } from 'react';

function Header() {
     const [visible, setVisible] = useState(false)
     const dispatch = useDispatch()
     const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
     const handleLogout = async () => {
          dispatch(logout());
     };
     return (
          <>

               <header className="border-b bg-white">
                    <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
                         <Link to="/" className="text-2xl font-bold block">Zomato</Link>
                         <nav className="space-x-4">
                              {isAuthenticated ?
                                   <>
                                        <Link to="/add-restaurant" className=" text-sm font-semibold text-gray-900">Add Restaurant</Link>
                                        <div className="relative inline-block text-left">
                                             <div>
                                                  <button onClick={() => setVisible(!visible)} type="button" className="inline-flex w-full justify-center gap-x-1.5 text-sm font-semibold text-gray-900">
                                                       Settings
                                                       <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                                       </svg>
                                                  </button>
                                             </div>
                                             {visible &&
                                                  <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                                       <div className="py-1">
                                                            <Link to="#" className="block px-4 py-2 text-sm text-gray-700">Profile</Link>
                                                            <Link to="#" className="block px-4 py-2 text-sm text-gray-700">My Orders</Link>
                                                            <button type="button" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700">Log Out</button>
                                                       </div>
                                                  </div>
                                             }
                                        </div>
                                   </>
                                   :
                                   <>
                                        <Link to="/login" className=" text-sm font-semibold text-gray-900">Log in</Link>
                                        <Link to="/register" className=" text-sm font-semibold text-gray-900">Register</Link>
                                   </>
                              }
                         </nav>
                    </div>
               </header>

          </>
     )
}

export default Header
