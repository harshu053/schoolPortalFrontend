import { createContext, useContext, useState, useEffect } from 'react';

// Create the authentication context
export const AuthContext = createContext();

// Create a hook to use the auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// Create the auth provider component
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if there's a token in localStorage
        const token = localStorage.getItem('token');
        if (token) {
            // Fetch user data from the backend
            fetch('http://localhost:5000/api/auth/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    localStorage.removeItem('token');
                    setUser(null);
                } else {
                    setUser(data);
                }
            })
            .catch(() => {
                localStorage.removeItem('token');
                setUser(null);
            })
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    // Login function
    const login = async (schoolEmail, password) => {

        try {
        
            const response = await fetch('http://localhost:5000/api/schools/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ schoolEmail, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setUser(data);
                return data;
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    // Check if user has a specific permission
    const hasPermission = (permission) => {
        return user?.permissions?.includes(permission) || false;
    };

    const value = {
        user,
        loading,
        login,
        logout,
        hasPermission
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
