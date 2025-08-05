import { createContext, useContext, useState, useEffect } from 'react';
import { apibaseUrl } from '@/utils/utils';

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
        const validateToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            console.log('Validating token:', token);

            try {
                const response = await fetch('http://localhost:5000/api/auth/validate/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log('Token validation response:', response);

                const data = await response.json();
                console.log('Token validation data:', data);

                if (!response.ok || data.error) {
                    console.error('Token validation failed:', data.error || 'Unknown error');
                    localStorage.removeItem('token');
                    setUser(null);
                } else {
                    console.log('Token is valid, setting user:', data);
                    setUser(data);
                }
            } catch (error) {
                console.error('Token validation error:', error);
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        validateToken();
    }, []);

    // Login function
    const login = async (schoolEmail, password) => {

        try {
        
            const response = await fetch(`${apibaseUrl}auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ schoolEmail, password })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                if (!result.data || !result.data.token) {
                    throw new Error('Invalid response format: Missing token');
                }
                localStorage.setItem('token', result.data.token);
                setUser(result.data);
                return result.data;
            } else {
                // Handle specific error messages from the backend
                const errorMessage = result.message || 'Login failed';
                console.error('Login error:', errorMessage);
                throw new Error(errorMessage);
            }
        } catch (error) {
            // Handle network errors or JSON parsing errors
            if (error instanceof SyntaxError) {
                console.error('Invalid response format:', error);
                throw new Error('Server returned an invalid response');
            }
            if (error instanceof TypeError) {
                console.error('Network error:', error);
                throw new Error('Unable to connect to the server');
            }
            // Throw the original error if it's already an Error instance
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
