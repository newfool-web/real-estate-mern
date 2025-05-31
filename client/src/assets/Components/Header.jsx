import { Search } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

export default function Header() {
  const { currentUser } = useSelector((state) => state.user)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set("searchTerm", searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get("searchTerm")
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])

  return (
    <header className="bg-gradient-to-r from-slate-50 to-blue-50 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold text-xl sm:text-2xl flex flex-wrap">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Estate</span>
            <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">Link</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm p-2 px-4 ml-21 rounded-full flex items-center border border-gray-200 shadow-sm hover:shadow transition-all duration-200 w-auto sm:w-72 md:w-80"
        >
          <input
            type="text"
            placeholder="Search properties..."
            className="bg-transparent focus:outline-none w-full text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <Search className="h-4 w-4" />
          </button>
        </form>

        <nav>
          <ul className="flex items-center gap-6">
            <Link to="/">
              <li className="hidden sm:block text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:block text-gray-700 hover:text-blue-600 font-medium transition-colors">About</li>
            </Link>
            <Link to="/profile">
              {currentUser ? (
                <div className="relative">
                  <img
                    className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-md hover:border-blue-400 transition-all duration-200"
                    src={currentUser.avatar || "/placeholder.svg"}
                    alt="profile"
                  />
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              ) : (
                <li className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-200">
                  Sign in
                </li>
              )}
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}
