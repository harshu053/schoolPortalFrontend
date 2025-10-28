// import { createContext, useContext, useState, useEffect } from "react";
// import { apibaseUrl } from "@/utils/utils";
// import { useRouter } from "next/router";

// // Create the authentication context
// export const AuthContext = createContext();

// // Create a hook to use the auth context
// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }

// // Create the auth provider component
// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [schoolDeatils, setSchoolDeatils] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   // const permission= ['teacher', 'principal', 'administration','superAdmin','student','staff','admin'];

//   useEffect(() => {
//     const validateToken = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setLoading(false);
//         return;
//       }
//       try {
//         const response = await fetch(`${apibaseUrl}auth/validate/profile`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();

//         if (!response.ok || data.error) {
//           console.error(
//             "Token validation failed:",
//             data.error || "Unknown error"
//           );
//           localStorage.removeItem("token");
//           setUser(null);
//         } else {
//           setUser(data.user);
//           setSchoolDeatils(data.schoolDeatils);
//         }
//       } catch (error) {
//         localStorage.removeItem("token");
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     validateToken();
//   }, []);

//   // Login function
//   const login = async (schoolEmail, password) => {
//     try {
//       const response = await fetch(`${apibaseUrl}auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ schoolEmail, password }),
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         localStorage.setItem("token", result.data.token);
//         setUser(result.data);
//         return result.data;
//       } else {
//         const errorMessage = result.message || "Login failed";
//         console.error("Login error:", errorMessage);
//       }
//     } catch (error) {
//       // Handle network errors or JSON parsing errors
//       if (error instanceof SyntaxError) {
//         console.error("Invalid response format:", error);
//         throw new Error("Server returned an invalid response");
//       }
//       if (error instanceof TypeError) {
//         console.error("Network error:", error);
//         throw new Error("Unable to connect to the server");
//       }
//       // Throw the original error if it's already an Error instance
//       throw error;
//     }
//   };

//   const handleDemoLogin = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/auth/demo/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await res.json();
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       setUser(data.data); 
//       return data.data;
//     //   router.push("/dashboard");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     router.push("/login");
//   };

//   // Check if user has a specific permission
//   const hasPermission = (permissions) => {
//     return permissions.includes(user?.role);
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//     hasPermission,
//     schoolDeatils,
//     handleDemoLogin
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }












import { createContext, useContext, useState, useEffect } from "react";
import { apibaseUrl } from "@/utils/utils";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export function AuthProvider({ children }) {
  const router = useRouter();

  // ✅ Load user instantly from localStorage to avoid flicker
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const [schoolDeatils, setSchoolDeatils] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apibaseUrl}auth/validate/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (!response.ok || data.error) {
          console.error("Token validation failed:", data.error || "Unknown error");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        } else {
          setUser(data.user);
          setSchoolDeatils(data.schoolDeatils);
          // ✅ Save latest user data in localStorage
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      } catch (error) {
        console.error("Validation error:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  // ✅ Normal Login
  const login = async (schoolEmail, password) => {
    try {
      const response = await fetch(`${apibaseUrl}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolEmail, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user", JSON.stringify(result.data));
        setUser(result.data);
        return result.data;
      } else {
        throw new Error(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // ✅ Demo Login Functionality
  const handleDemoLogin = async () => {
    try {
      const res = await fetch(`${apibaseUrl}auth/demo/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Demo login failed:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  const hasPermission = (permissions) => permissions.includes(user?.role);

  const value = {
    user,
    loading,
    login,
    logout,
    hasPermission,
    schoolDeatils,
    handleDemoLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
