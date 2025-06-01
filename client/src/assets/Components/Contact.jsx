import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { User, Mail, Send, Loader2 } from "lucide-react"

export default function Contact({ listing }) {
  console.log(listing)
  const [landlord, setLandlord] = useState(null)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)

  const onChange = (e) => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/user/${listing.userRef}`)
        const data = await res.json()
        setLandlord(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchLandlord()
  }, [listing.userRef])

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-gray-600">Loading contact info...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {landlord && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Contact Agent
            </h3>
          </div>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="w-8 h-8 text-white" />
            </div>
            
            <p className="text-gray-600 text-sm">Property Owner</p>
            <h4 className="font-semibold text-gray-800">{landlord.username}</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Mail className="h-5 w-5 text-blue-600" />
              <span className="text-blue-700">{landlord.email}</span>
            </div>

            <p className="text-gray-700">
              Contact <span className="font-semibold">{landlord.username}</span> for{" "}
              <span className="font-semibold capitalize">{listing.name}</span>:
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
              <textarea
                name="message"
                id="message"
                rows={4}
                value={message}
                onChange={onChange}
                placeholder="Enter your message here..."
                className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none"
              />
            </div>

            <Link
              to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-2"
            >
              <Send className="h-5 w-5" />
              <span>Send Message</span>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
