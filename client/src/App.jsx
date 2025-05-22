import About from './Pages/About';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Header from './assets/Components/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PrivateRoute from './assets/Components/PrivateRoute';
import CreateListing from './Pages/CreateListing';
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
        </Route>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}
