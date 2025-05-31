import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Camera,
  Trash2,
  LogOut,
  Plus,
  Edit,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react";

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState("");
  const [formData, setFormData] = useState({});
  const [showListingsError, setShowListingsError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    try {
      
      if (file.size > 2 * 1024 * 1024) {
        setFileUploadError("File size must be less than 2MB");
        return;
      }

      setFilePerc(0);
      setFileUploadError("");

      
      const formData = new FormData();
      formData.append("file", file);

      
      const response = await fetch("/api/user/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Upload failed");
      }

      if (data.url) {
        setFormData((prev) => ({ ...prev, avatar: data.url }));
        setFilePerc(100);
        setFileUploadError("");
      }
    } catch (error) {
      setFileUploadError(error.message || "Error uploading file");
      setFilePerc(0);
      console.error("Error uploading file:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

      
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/sign-out");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        const res = await fetch(`/api/listing/delete/${listingId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setUserListings((prev) =>
          prev.filter((listing) => listing._id !== listingId)
        );
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent text-center mb-8">
          Your Profile
        </h1>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="relative mx-auto">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <div className="relative group">
              <img
                onClick={() => fileRef.current.click()}
                src={formData.avatar || currentUser.avatar}
                alt="profile"
                className="rounded-full h-32 w-32 object-cover cursor-pointer border-4 border-white shadow-lg group-hover:border-blue-300 transition-all duration-200"
              />
              <div
                onClick={() => fileRef.current.click()}
                className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="text-white h-8 w-8" />
              </div>
            </div>

            {fileUploadError ? (
              <div className="mt-2 flex items-center justify-center gap-1 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{fileUploadError}</span>
              </div>
            ) : filePerc > 0 && filePerc < 100 ? (
              <div className="mt-2 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${filePerc}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 mt-1">{`Uploading ${filePerc}%`}</span>
              </div>
            ) : filePerc === 100 ? (
              <div className="mt-2 flex items-center justify-center gap-1 text-emerald-600 text-sm">
                <Check className="h-4 w-4" />
                <span>Image uploaded successfully!</span>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                defaultValue={currentUser.username}
                id="username"
                className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                defaultValue={currentUser.email}
                id="email"
                className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="New Password"
                id="password"
                className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Updating...</span>
              </div>
            ) : (
              "Update Profile"
            )}
          </button>

          <Link
            className="py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-2"
            to={"/create-listing"}
          >
            <Plus className="h-5 w-5" />
            <span>Create New Listing</span>
          </Link>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {updateSuccess && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-green-700">
            <Check className="h-5 w-5 flex-shrink-0" />
            <p>Profile updated successfully!</p>
          </div>
        )}

        <div className="flex justify-between mt-8 border-t border-gray-200 pt-6">
          <button
            onClick={handleDeleteUser}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium transition-colors"
          >
            <Trash2 className="h-5 w-5" />
            <span>Delete Account</span>
          </button>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="mt-10">
          <button
            onClick={handleShowListings}
            className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <span>Show My Listings</span>
          </button>

          {showListingsError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <p>Error loading listings. Please try again.</p>
            </div>
          )}
        </div>

        {userListings && userListings.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
              Your Listings
            </h2>

            <div className="space-y-4">
              {userListings.map((listing) => (
                <div
                  key={listing._id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex"
                >
                  <Link
                    to={`/listing/${listing._id}`}
                    className="flex-shrink-0"
                  >
                    <img
                      src={listing.imageUrls[0] || "/placeholder.svg"}
                      alt="listing cover"
                      className="h-24 w-24 object-cover"
                    />
                  </Link>

                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <Link
                      className="text-gray-800 font-semibold hover:text-blue-600 transition-colors line-clamp-1"
                      to={`/listing/${listing._id}`}
                    >
                      {listing.name}
                    </Link>

                    <div className="flex items-center justify-end gap-3 mt-2">
                      <button
                        onClick={() => handleListingDelete(listing._id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>

                      <Link to={`/update-listing/${listing._id}`}>
                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
