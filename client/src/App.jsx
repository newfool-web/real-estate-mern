import About from './Pages/About';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Header from './assets/Components/Header';
import Footer from './assets/Components/Footer';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PrivateRoute from './assets/Components/PrivateRoute';
import CreateListing from './Pages/CreateListing';
import UpdateListing from './Pages/UpdateListing';
import Listing from './Pages/Listing';
import Search from './Pages/Search';
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute />} >
        <Route path='/profile' element={<Profile />} />
        <Route path='/create-listing' element={<CreateListing />} />
        <Route path='/update-listing/:listingId' element={<UpdateListing />} />
        </Route>
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route path='/search' element={<Search />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
