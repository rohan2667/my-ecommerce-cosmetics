// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const LoginPage = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [credentials, setCredentials] = useState({ email: '', password: '' });

//   const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login(credentials.email); 
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
//         <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             value={credentials.email}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-pink-400"
//             required
//           />
//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={credentials.password}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-pink-400"
//             required
//           />
//           <button className="w-full py-2 bg-pink-500 text-white font-semibold rounded hover:bg-pink-600">
//             Login
//           </button>
//         </form>
//         <p className="mt-4 text-sm text-center text-gray-600">
//           Don’t have an account? <a href="/signup" className="text-pink-600 font-medium">Sign up</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
