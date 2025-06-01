import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon, Filter, SortAsc } from "lucide-react";
import ListingItem from "../assets/Components/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true",
        furnished: furnishedFromUrl === "true",
        offer: offerFromUrl === "true",
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) setShowMore(true);
      else setShowMore(false);
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, checked } = e.target;

    if (["all", "rent", "sale"].includes(id)) {
      setSidebardata({ ...sidebardata, type: id });
    } else if (id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: value });
    } else if (["parking", "furnished", "offer"].includes(id)) {
      setSidebardata({ ...sidebardata, [id]: checked });
    } else if (id === "sort_order") {
      const [sort, order] = value.split("_");
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    Object.entries(sidebardata).forEach(([key, val]) =>
      urlParams.set(key, val)
    );
    navigate(`/search?${urlParams.toString()}`);
  };

  const onShowMoreClick = async () => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", listings.length);
    const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
    const data = await res.json();
    if (data.length < 9) setShowMore(false);
    setListings([...listings, ...data]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        <div className="w-full lg:w-72 xl:w-100 p-6 lg:p-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 sticky top-6">
            <div className="flex items-center gap-7 mb-8">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Search Filters
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Search Term
                </label>
                <div className="relative">
                  <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="searchTerm"
                    placeholder="Search properties..."
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    value={sidebardata.searchTerm}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Property Type
                </label>
                <div className="grid grid-cols-3 gap-2 ">
                  {["all", "rent", "sale"].map((type) => (
                    <label key={type} className="relative cursor-pointer">
                      <input
                        type="checkbox"
                        id={type}
                        onChange={handleChange}
                        checked={sidebardata.type === type}
                        className="sr-only"
                      />
                      <div
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-center font-medium ${
                          sidebardata.type === type
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 bg-white hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <span className="capitalize">{type}</span>
                      </div>
                    </label>
                  ))}
                  <label className="relative cursor-pointer col-span-3">
                    <input
                      type="checkbox"
                      id="offer"
                      onChange={handleChange}
                      checked={sidebardata.offer}
                      className="sr-only"
                    />
                    <div
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-center font-medium ${
                        sidebardata.offer
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-gray-200 bg-white hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      Special Offers
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Amenities
                </label>
                <div className="flex gap-2">
                  {[
                    { id: "parking", label: "Parking Available" },
                    { id: "furnished", label: "Fully Furnished" },
                  ].map(({ id, label }) => (
                    <label key={id} className="relative cursor-pointer">
                      <input
                        type="checkbox"
                        id={id}
                        onChange={handleChange}
                        checked={sidebardata[id]}
                        className="sr-only"
                      />
                      <div
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-center font-medium ${
                          sidebardata[id]
                            ? "border-purple-500 bg-purple-50 text-purple-700"
                            : "border-gray-200 bg-white hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        {label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className=" text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <SortAsc className="w-4 h-4" />
                  Sort By
                </label>
                <select
                  onChange={handleChange}
                  defaultValue="created_at_desc"
                  id="sort_order"
                  className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="regularPrice_desc">Price: High to Low</option>
                  <option value="regularPrice_asc">Price: Low to High</option>
                  <option value="createdAt_desc">Newest First</option>
                  <option value="createdAt_asc">Oldest First</option>
                </select>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl">
                Search Properties
              </button>
            </form>
          </div>
        </div>

        <div className="flex-1 p-6 lg:p-8 ">
          <div className="mb-8 flex flex-col gap-2">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Property Listings
            </h1>
            <p className="text-gray-600 text-lg">
              Discover your perfect home from our curated collection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {!loading && listings.length === 0 && (
              <div className="col-span-full text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                  <SearchIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No Properties Found
                </h3>
                <p className="text-gray-500 text-lg">
                  Try adjusting your search filters to find more results.
                </p>
              </div>
            )}

            {loading && (
              <div className="col-span-full text-center py-16">
                <div className="inline-flex items-center gap-3">
                  <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <span className="text-xl font-medium text-gray-600">
                    Loading properties...
                  </span>
                </div>
              </div>
            )}

            {!loading &&
              listings &&
              listings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
          </div>

          {showMore && (
            <div className="text-center mt-12">
              <button
                onClick={onShowMoreClick}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-semibold hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Load More Properties
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
