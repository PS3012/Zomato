import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
     const [searchTerm, setSearchTerm] = useState('')
     const navigate = useNavigate()

     const handleSearch = (e) => {
          e.preventDefault()
          if (searchTerm.trim()) {
               navigate(`/restaurants/${searchTerm.toLowerCase().replace(/\s+/g, '-')}`)
          }
     }

     return (
          <>
               <div
                    className="relative bg-cover bg-center h-[500px]"
                    style={{ backgroundImage: 'url(/images/banner.avif)' }}
               >
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                         <h1 className="text-5xl font-semibold mb-6 text-center">
                              Discover the best food & drinks
                         </h1>
                         <form onSubmit={handleSearch} className="flex bg-white text-gray-700 rounded overflow-hidden">
                              <input
                                   type="text"
                                   value={searchTerm}
                                   onChange={(e) => setSearchTerm(e.target.value)}
                                   placeholder="Search for location, restaurant, cuisine or a dish"
                                   className="px-4 py-2 w-96 outline-none"
                              />
                              <button type="submit" className="px-6 bg-red-500 text-white">Search</button>
                         </form>
                    </div>
               </div>

               <div className="p-6">
                    <div className="bg-white grid grid-cols-2 items-center max-w-4xl mx-auto">
                         <img src="/images/app.avif" alt="App Preview" className="w-full" />
                         <div>
                              <h2 className="text-5xl font-semibold mb-4">Get the Zomato App</h2>
                              <p className="mb-4">We will send you a link, open it on your phone to download the app</p>
                         </div>
                    </div>
               </div>
          </>
     )
}

export default Home
