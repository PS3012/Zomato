import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosReq from '../axios.config'

function RestaurantList() {
     const { location } = useParams()
     const [restaurants, setRestaurants] = useState([])
     const [loading, setLoading] = useState(true)
     const [error, setError] = useState(null)

     useEffect(() => {
          const fetchRestaurants = async () => {
               try {
                    const response = await axiosReq.get(`/restaurant`)
                    setRestaurants(response.data.data)
                    setLoading(false)
               } catch (err) {
                    setError('Failed to fetch restaurants')
                    setLoading(false)
               }
          }
          fetchRestaurants()
     }, [location])

     if (loading) return <div className="text-center p-8">Loading...</div>
     if (error) return <div className="text-center p-8 text-red-500">{error}</div>

     return (
          <div className="container mx-auto p-6">
               <h1 className="text-3xl font-semibold mb-6">Restaurants in {location}</h1>

               {restaurants && restaurants.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {restaurants.map((restaurant) => (
                              <div key={restaurant._id} className="border rounded-lg overflow-hidden shadow-lg">
                                   <img
                                        src={restaurant.restaurantImage || '/images/default-restaurant.jpg'}
                                        alt={restaurant.name}
                                        className="w-full h-48 object-cover"
                                   />
                                   <div className="p-4">
                                        <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
                                        <p className="text-gray-600 mb-2">{restaurant.cuisines.join(', ')}</p>
                                        <div className="flex items-center mb-2">
                                             <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                                                  {restaurant.rating} ★
                                             </span>
                                        </div>
                                        <p className="text-gray-500">{restaurant.address}</p>
                                   </div>
                              </div>
                         ))}
                    </div>
               ) : (
                    <p className="text-center text-gray-500">No restaurants found in this location.</p>
               )
               }
          </div>
     )
}

export default RestaurantList 