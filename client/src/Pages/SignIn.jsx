// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';



// export default function SignIn() {
//   const [formData, setFormData] = useState({});
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
  

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const res = await fetch('/api/auth/sign-in', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
      
//       if (data.success === false) {
//         setLoading(false);
//         setError(data.message);
//         return;
//       }
      
//       setLoading(false);
//       setError(null);
//       navigate('/');
//     } catch (error) {
//       setLoading(false);      
//       setError(error.message);
//     }
//   };


//   const isFormValid = formData.identifier && formData.password
//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//       <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//         <input
//           type='text'
//           placeholder='Username or Email'
//           className='border p-3 rounded-lg'
//           id='identifier'
//           onChange={handleChange}
//         />        
//         <input
//           type='password'
//           placeholder='Password'
//           className='border p-3 rounded-lg'
//           id='password'
//           onChange={handleChange}
//         />

//         <button
//           disabled={!isFormValid || loading}
//           className={`bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 ${
//             isFormValid && !loading ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer' : 'bg-gray-500 cursor-not-allowed text-gray-300'
//           }`}
          
            
//         >
//           {loading ? 'Loading...' : 'Sign In'}
//         </button>
        
//       </form>
//       <div className='flex gap-2 mt-5'>
//         <p>Dont have an account?</p>
//         <Link to={'/sign-up'}>
//           <span className='text-blue-700'>Sign up</span>
//         </Link>
//       </div>
//       {error && <p className='text-red-500 mt-5'>{error}</p>}
//     </div>
//   );
// }

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-2xl'>
        <div>
          <h1 className='text-4xl text-center font-bold text-slate-800 mb-2'>Welcome Back</h1>
          <p className='text-center text-slate-600 text-sm mb-8'>Please enter your details to sign in</p>
        </div>
        
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <input
              type='text'
              placeholder='Username or Email'
              className='w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-slate-600 placeholder-slate-400'
              id='identifier' 
              onChange={handleChange}
            />
          </div>
          
          <div>
            <input
              type='password'
              placeholder='Password'
              className='w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-slate-600 placeholder-slate-400'
              id='password'
              onChange={handleChange}
            />
          </div>

          <button  
            disabled={loading}
            className='w-full bg-green-400 text-white py-3 rounded-xl font-semibold hover:bg-green-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02]'
          >
            {loading ? (
              <span className='flex items-center justify-center'>
                Loading...
              </span>
            ) : 'Sign In'}
          </button>
        </form>
        
        <div className='text-center mt-6'>
          <div className='flex items-center justify-center space-x-2 text-slate-600'>
            <p>Don't have an account?</p>
            <Link to={'/sign-up'}>
              <span className='text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200'>Sign up</span>
            </Link>
          </div>
          {error && (
            <div className='mt-4 p-3 bg-red-50 rounded-lg'>
              <p className='text-red-600 text-sm'>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}