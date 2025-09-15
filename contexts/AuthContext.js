import { createContext, useContext, useState, useEffect } from 'react';
import { apibaseUrl } from '@/utils/utils';
import { useRouter } from 'next/router';

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
    const [schoolDeatils, setSchoolDeatils] = useState(null);
    const [loading, setLoading] = useState(true);
    const router=useRouter();
    // const permission= ['teacher', 'principal', 'administration','superAdmin','student','staff','admin'];

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`${apibaseUrl}auth/validate/profile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json(); 

                if (!response.ok || data.error) {
                    console.error('Token validation failed:', data.error || 'Unknown error');
                    localStorage.removeItem('token'); 
                    setUser(null);
                } else {  
                    setUser(data.user);
                    setSchoolDeatils(data.schoolDeatils);
                }
            } catch (error) { 
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
                localStorage.setItem('token', result.data.token); 
                setUser(result.data);
                return result.data;
            } else { 
                const errorMessage = result.message || 'Login failed';
                console.error('Login error:', errorMessage); 
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
        router.push('/login');
    };

    // Check if user has a specific permission
    const hasPermission = (permissions) => {return permissions.includes(user?.role);};

    const value = {
        user,
        loading,
        login,
        logout,
        hasPermission,
        schoolDeatils
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
