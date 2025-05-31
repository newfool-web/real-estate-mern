import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Upload, X, Home, MapPin, Bed, Bath, DollarSign, Camera, Loader2, AlertCircle, Plus } from "lucide-react"

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  })
  const [imageUploadError, setImageUploadError] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleImageSubmit = async (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true)
      setImageUploadError(false)
      const promises = []

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          })
          setImageUploadError(false)
          setUploading(false)
        })
        .catch((err) => {
          setImageUploadError(err.message)
          setUploading(false)
        })
    } else {
      setImageUploadError("You can only upload 6 images per listing")
      setUploading(false)
    }
  }

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      try {
        if (file.size > 3 * 1024 * 1024) {
          reject(new Error("File size must be less than 3MB"))
          return
        }

        const formData = new FormData()
        formData.append("file", file)

        fetch("/api/user/upload", {
          method: "POST",
          credentials: "include",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (!data.url) {
              reject(new Error("Upload failed"))
              return
            }
            resolve(data.url)
          })
          .catch((error) => {
            reject(error)
          })
      } catch (error) {
        reject(error)
      }
    })
  }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    })
  }

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      })
    }

    if (e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      })
    }

    if (e.target.type === "number" || e.target.type === "text" || e.target.type === "textarea") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (formData.imageUrls.length < 1) return setError("You must upload at least one image")
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price")
      setLoading(true)
      setError(false)
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      })
      const data = await res.json()
      setLoading(false)
      if (data.success === false) {
        setError(data.message)
      }
      navigate(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-4">
            Create New Listing
          </h1>
          <p className="text-gray-600 text-lg">Share your property with potential buyers or renters</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Property Details
              </h2>
            </div>

            <div className="space-y-6">
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Property Name</label>
                <input
                  type="text"
                  placeholder="Beautiful 3-bedroom apartment..."
                  className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  id="name"
                  maxLength="62"
                  minLength="10"
                  required
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>

              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Describe your property in detail..."
                  className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 min-h-[120px] resize-none"
                  id="description"
                  required
                  onChange={handleChange}
                  value={formData.description}
                />
              </div>

              
              <div>
                <label className=" text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </label>
                <input
                  type="text"
                  placeholder="123 Main Street, City, State"
                  className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  id="address"
                  required
                  onChange={handleChange}
                  value={formData.address}
                />
              </div>

              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">Property Type</label>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {["sale", "rent"].map((type) => (
                    <label key={type} className="relative cursor-pointer">
                      <input
                        type="checkbox"
                        id={type}
                        onChange={handleChange}
                        checked={formData.type === type}
                        className="sr-only"
                      />
                      <div
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-center font-medium ${
                          formData.type === type
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 bg-white hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <span className="capitalize">{type}</span>
                      </div>
                    </label>
                  ))}
                </div>

                <label className="block text-sm font-semibold text-gray-700 mb-4">Features</label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: "parking", label: "Parking Available" },
                    { id: "furnished", label: "Fully Furnished" },
                    { id: "offer", label: "Special Offer" },
                  ].map(({ id, label }) => (
                    <label key={id} className="relative cursor-pointer">
                      <input
                        type="checkbox"
                        id={id}
                        onChange={handleChange}
                        checked={formData[id]}
                        className="sr-only"
                      />
                      <div
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-center font-medium ${
                          formData[id]
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-gray-200 bg-white hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        {label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Bed className="w-4 h-4" />
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    id="bedrooms"
                    min="1"
                    max="10"
                    required
                    className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    onChange={handleChange}
                    value={formData.bedrooms}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Bath className="w-4 h-4" />
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    id="bathrooms"
                    min="1"
                    max="10"
                    required
                    className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    onChange={handleChange}
                    value={formData.bathrooms}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Regular Price {formData.type === "rent" ? "(per month)" : ""}
                </label>
                <input
                  type="number"
                  id="regularPrice"
                  min="1"
                  max="10000000"
                  required
                  className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
              </div>

              {formData.offer && (
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Discounted Price {formData.type === "rent" ? "(per month)" : ""}
                  </label>
                  <input
                    type="number"
                    id="discountPrice"
                    min="1"
                    max="10000000"
                    required
                    className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                </div>
              )}
            </div>
          </div>

          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Property Images
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Upload Images
                  <span className="font-normal text-gray-500 ml-2">First image will be the cover (max 6 images)</span>
                </p>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    onChange={(e) => setFiles(e.target.files)}
                    className="hidden"
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                  />
                  <label htmlFor="images" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to select images</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 3MB each</p>
                  </label>
                </div>

                <button
                  type="button"
                  disabled={uploading || !files.length}
                  onClick={handleImageSubmit}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {uploading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Plus className="h-5 w-5" />
                      <span>Upload Images</span>
                    </div>
                  )}
                </button>

                {imageUploadError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <p>{imageUploadError}</p>
                  </div>
                )}
              </div>

              
              {formData.imageUrls.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-4">Uploaded Images</p>
                  <div className="space-y-3">
                    {formData.imageUrls.map((url, index) => (
                      <div
                        key={url}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200"
                      >
                        <img
                          src={url || "/placeholder.svg"}
                          alt="listing image"
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">{index === 0 ? "Cover Image" : `Image ${index + 1}`}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

             
              <button
                disabled={loading || uploading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Creating Listing...</span>
                  </div>
                ) : (
                  "Create Listing"
                )}
              </button>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
