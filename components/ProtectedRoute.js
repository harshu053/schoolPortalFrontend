import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null; // Prevent flashing content
    }

    return children;
}
