import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { MapPin, Bed, Bath, Car, Sofa, Tag, Share2, Home } from "lucide-react";
import Contact from "../assets/Components/Contact";
import { useSelector } from "react-redux";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setListing(data);
        console.log(listing);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="text-xl font-medium text-gray-600">
              Loading...
            </span>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-200 to-red-300 rounded-full flex items-center justify-center">
              <Home className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Something went wrong!
            </h3>
            <p className="text-gray-500 text-lg">Please try again later.</p>
          </div>
        </div>
      )}

      {listing && !loading && !error && (
        <div>
          <div className="relative h-[60vh] lg:h-[70vh]">
            <Swiper navigation className="h-full">
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${url})`,
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute top-6 right-6 z-10 flex gap-3">
              <button
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              >
                <Share2 className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            {copied && (
              <div className="absolute top-20 right-6 z-10 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
                Link copied!
              </div>
            )}
          </div>

          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className={
                (!currentUser?.currentUser || (currentUser?.currentUser && listing.userRef !== currentUser.currentUser._id) || contact)
                  ? 'lg:col-span-2'
                  : 'lg:col-span-full'
              }>
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 mb-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                        {listing.name}
                      </h1>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-5 w-5" />
                        <span className="text-lg">{listing.address}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">
                        $
                        {listing.offer
                          ? listing.discountPrice.toLocaleString()
                          : listing.regularPrice.toLocaleString()}
                        {listing.type === "rent" && (
                          <span className="text-lg text-gray-500">/month</span>
                        )}
                      </div>
                      {listing.offer && (
                        <div className="text-lg text-gray-500 line-through">
                          ${listing.regularPrice.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <div
                      className={`px-4 py-2 rounded-full font-medium ${
                        listing.type === "rent"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      For {listing.type === "rent" ? "Rent" : "Sale"}
                    </div>
                    {listing.offer && (
                      <div className="px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-medium flex items-center gap-1">
                        <Tag className="h-4 w-4" />$
                        {listing.regularPrice - listing.discountPrice} OFF
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <Bed className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-800">
                        {listing.bedrooms}
                      </div>
                      <div className="text-sm text-gray-600">
                        {listing.bedrooms > 1 ? "beds" : "bed"}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <Bath className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-800">
                        {listing.bathrooms}
                      </div>
                      <div className="text-sm text-gray-600">
                        {listing.bathrooms > 1 ? "baths" : "bath"}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <Car className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-800">
                        {listing.parking ? "Yes" : "No"}
                      </div>
                      <div className="text-sm text-gray-600">Parking spot</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <Sofa className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-800">
                        {listing.furnished ? "Yes" : "No"}
                      </div>
                      <div className="text-sm text-gray-600">Furnished</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {listing.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className={
                (!currentUser?.currentUser || (currentUser?.currentUser && listing.userRef !== currentUser.currentUser._id) || contact)
                  ? 'lg:col-span-1'
                  : 'hidden'
              }>
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 sticky top-6">
                  {!currentUser?.currentUser && (
                    <div className="text-center text-gray-600">
                      <p className="mb-4">Log in to send message to landlord</p>
                      <Link
                        to="/sign-in"
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 inline-block"
                      >
                        Sign In
                      </Link>
                    </div>
                  )}

                  {currentUser?.currentUser &&
                    listing.userRef !== currentUser.currentUser._id &&
                    !contact && (
                      <button
                        onClick={() => setContact(true)}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Contact landlord
                      </button>
                    )}

                  {contact && <Contact listing={listing} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
