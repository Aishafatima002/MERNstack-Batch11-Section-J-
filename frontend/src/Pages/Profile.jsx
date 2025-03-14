// import React, { useEffect, useState } from "react";
// import { toast,ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("No token found! Please log in.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch("http://localhost:5000/api/user/me", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         const text = await response.text();
//         try {
//           const data = JSON.parse(text);
//           if (response.ok) {
//             setUser(data.user);
//             toast.success("Profile loaded successfully!");
//           } else {
//             toast.error(data.message || "Failed to load profile.");
//           }
//         } catch (err) {
//           console.error("Unexpected response:", text);
//           toast.error("Invalid server response.");
//         }
//       } catch (error) {
//         toast.error("Something went wrong. Try again later!");
//         console.error("Fetch Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);



//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center text-gray-800">Profile</h2>
//         {loading ? (
//           <p className="text-gray-500 text-center mt-4">Loading...</p>
//         ) : user ? (
//           <div className="mt-4 text-center">
//             <p className="text-lg text-gray-700">
//               <strong>Name:</strong> {user.name}
//             </p>
//             <p className="text-lg text-gray-700">
//               <strong>Email:</strong> {user.email}
//             </p>
//             <p className="text-lg text-gray-700">
//               <strong>Joined On:</strong> {new Date(user.createdAt).toDateString() }
              
//             </p>
//             <button
//               onClick={() => {
//                 localStorage.removeItem("token");
//                 toast.success("Logged out successfully!");
//                 setUser(null);
//               }}
//               className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <p className="text-red-500 text-center mt-4">User not found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("No token found! Please log in.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/user/me", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                });

                const data = await response.json();
                console.log("Fetched User Data:", data);

                if (response.ok) {
                    setUser(data.user);
                    toast.success("Profile loaded successfully!");
                } else {
                    toast.error(data.message || "Failed to load profile.");
                }
            } catch (error) {
                toast.error("Something went wrong. Try again later!");
                console.error("Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800">Profile</h2>
                {loading ? (
                    <p className="text-gray-500 text-center mt-4">Loading...</p>
                ) : user ? (
                    <div className="mt-4 text-center">
                        <p className="text-lg text-gray-700"><strong>Name:</strong> {user.name}</p>
                        <p className="text-lg text-gray-700"><strong>Email:</strong> {user.email}</p>
                        <p className="text-lg text-gray-700">
                            <strong>Joined On:</strong> {new Date(user.createdAt).toDateString()}
</p>

                        <button onClick={() => { localStorage.removeItem("token"); toast.success("Logged out successfully!"); setUser(null); }} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
                    </div>
                ) : (
                    <p className="text-red-500 text-center mt-4">User not found.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
