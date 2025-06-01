import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore from "swiper"
import { Navigation } from "swiper/modules"
import "swiper/css/bundle"
import ListingItem from "../assets/Components/ListingItem"
import { ArrowRight, Tag, Wallet, Building, Home } from "lucide-react"

export default function HomePage() {
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  SwiperCore.use([Navigation])

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4")
        const data = await res.json()
        setOfferListings(data)
        fetchRentListings()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4")
        const data = await res.json()
        setRentListings(data)
        fetchSaleListings()
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4")
        const data = await res.json()
        setSaleListings(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListings()
  }, [])

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70 z-10" />

        <div className="h-[70vh] lg:h-[85vh] relative">
          <Swiper navigation className="h-full">
            {offerListings && offerListings.length > 0 ? (
              offerListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${listing.imageUrls[0]})`,
                    }}
                  />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="h-full w-full bg-gradient-to-r from-blue-500 to-purple-600" />
              </SwiperSlide>
            )}
          </Swiper>
        </div>

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Find your next <span className="text-blue-300">perfect</span> place with ease
              </h1>
              <p className="text-white/80 text-lg md:text-xl mb-8">
                Estate Link offers a wide range of properties for you to choose from. Find your dream home today.
              </p>
              <Link
                to={"/search"}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Explore Properties</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="space-y-16 lg:space-y-24">
          {offerListings && offerListings.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl">
                    <Tag className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Special Offers
                  </h2>
                </div>
                <Link
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  to={"/search?offer=true"}
                >
                  <span>View All</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}

          {rentListings && rentListings.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Properties for Rent
                  </h2>
                </div>
                <Link
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  to={"/search?type=rent"}
                >
                  <span>View All</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}

          {saleListings && saleListings.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Properties for Sale
                  </h2>
                </div>
                <Link
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  to={"/search?type=sale"}
                >
                  <span>View All</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to find your dream home?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Browse our extensive collection of properties and find the perfect place that matches your needs and budget.
          </p>
          <Link
            to={"/search"}
            className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Home className="h-5 w-5" />
            <span>Start Your Search</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
