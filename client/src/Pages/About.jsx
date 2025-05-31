import { Link } from "react-router-dom";
import {
  Home,
  Users,
  Award,
  Shield,
  MapPin,
  Phone,
  Mail,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import officeImage from "../assets/office.jpg"
import profileImage from "../assets/profile.jpg"

export default function About() {
  const stats = [
    { number: "10,000+", label: "Properties Listed", icon: Home },
    { number: "5,000+", label: "Happy Clients", icon: Users },
    { number: "7+", label: "Years Experience", icon: Award },
    { number: "99%", label: "Customer Satisfaction", icon: Star },
  ];

  const features = [
    {
      icon: Shield,
      title: "Trusted & Secure",
      description:
        "All our listings are verified and our platform uses the latest security measures to protect your data.",
    },
    {
      icon: MapPin,
      title: "Prime Locations",
      description:
        "We specialize in properties in the most desirable neighborhoods and upcoming areas.",
    },
    {
      icon: Users,
      title: "Expert Agents",
      description:
        "Our team of experienced real estate professionals is here to guide you every step of the way.",
    },
    {
      icon: Award,
      title: "Award Winning",
      description:
        "Recognized as one of the leading real estate platforms with multiple industry awards.",
    },
  ];

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="relative py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=1600')",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            About <span className="text-blue-300">Estate Link</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Your trusted partner in finding the perfect property. We've been
            connecting people with their dream homes for over a decade.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl w-fit mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded in 2018, Estate Link began with a simple mission: to
                make finding your perfect home as easy and enjoyable as
                possible. What started as a small local agency has grown into
                one of the most trusted real estate platforms in the region.
              </p>
              <p>
                We believe that everyone deserves to find a place they can truly
                call home. Whether you're a first-time buyer, looking to
                upgrade, or searching for an investment property, our team is
                dedicated to making your real estate journey smooth and
                successful.
              </p>
              <p>
                Today, we're proud to have helped thousands of families find
                their dream homes and assisted countless property owners in
                connecting with the right buyers and tenants.
              </p>
            </div>
            <div className="mt-8">
              <Link
                to="/search"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Explore Properties</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <img
              src={officeImage}
              alt="Our office"
              className="w-full h-80 object-cover rounded-2xl"
            />
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Why Choose Estate Link?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We're committed to providing exceptional service and making your
              real estate experience seamless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Meet Our Founder
            </h2>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 text-center">
            <img
              src={profileImage}
              alt="Achyut Gupta - Founder & CEO"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              Achyut Gupta
            </h3>
            <p className="text-blue-600 font-medium mb-4">Founder & CEO</p>
            <p className="text-gray-600 leading-relaxed">
            "With over 15 years in real estate, Estate Link was founded with a vision to revolutionize property search. Our mission is to simplify the home-buying journey through innovation, transparency, and user-centric solutions that redefine how people connect with real estate."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Our Values
            </h3>
            <div className="space-y-4">
              {[
                "Transparency in all our dealings",
                "Customer satisfaction is our priority",
                "Innovation in real estate technology",
                "Building lasting relationships",
                "Commitment to excellence",
              ].map((value, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Address</p>
                  <p className="text-gray-600">
                    Kota, Rajasthan
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Phone className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Phone</p>
                  <p className="text-gray-600">7307503663</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Mail className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <p className="text-gray-600">info@estatelink.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Let us help you discover the perfect property that matches your
            needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Home className="h-5 w-5" />
              <span>Browse Properties</span>
            </Link>
            <Link
              to="/create-listing"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 border border-white/20"
            >
              <span>List Your Property</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
