// // src/components/Home.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const Home = () => {
//   const navigate = useNavigate();

//   const goToDashboard = () => {
//     navigate("/dashboard"); // replace with your dashboard route
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-6">
//       {/* Animated title */}
//       <motion.h1
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 1, type: "spring", stiffness: 120 }}
//         className="text-5xl md:text-6xl font-bold text-white text-center mb-6 drop-shadow-lg"
//       >
//         Shopify App
//       </motion.h1>

//       {/* Animated subtitle */}
//       <motion.p
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1, duration: 1 }}
//         className="text-xl md:text-2xl text-white mb-10 text-center"
//       >
//         Manage your Shopify store efficiently
//       </motion.p>

//       {/* Animated button */}
//       <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={goToDashboard}
//         className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300"
//       >
//         Merchant Dashboard
//       </motion.button>

//       {/* Optional animated background shapes */}
//       <motion.div
//         className="absolute top-0 left-0 w-48 h-48 bg-white rounded-full opacity-10"
//         animate={{ rotate: 360 }}
//         transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full opacity-10"
//         animate={{ rotate: -360 }}
//         transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
//       />
//     </div>
//   );
// };

// export default Home;
