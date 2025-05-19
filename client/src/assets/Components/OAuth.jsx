import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../../firebase'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { signInSuccess } from '../../redux/user/userSlice';

export const OAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleGoogleClick = async() => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      //Ye result mein hi tumko user ka data aayega, jo tumne signup karne ke liye use kiya hai.
      //Jisme display name, email aur photo url aayega.
      console.log(result)
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        })
      })
      
      const data = await res.json()
      console.log(data)
      dispatch(signInSuccess(data))
      navigate('/')

    } catch (error) { 
      console.log('Could not sign in with Google', error)
    }
  } 


  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center space-x-2 my-4'>
        <div className='flex-grow border-t border-gray-300 w-16'></div>
        <span className='text-gray-500 font-medium'>OR</span>
        <div className='flex-grow border-t border-gray-300 w-16'></div>
      </div>
      
      <button 
        type='button'
        onClick = {handleGoogleClick}
        className='w-full flex items-center justify-center gap-2 bg-white text-gray-700 px-4 py-3 rounded-xl
          border border-gray-300 hover:bg-gray-50 hover:border-gray-400 
          transition-all duration-200 transform hover:scale-[1.02]
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
          font-medium shadow-sm cursor-pointer'
      >
        <FcGoogle className='w-6 h-6' />
        <span>Continue with Google</span>
      </button>
    </div>
  )
}
