import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import Spinner from './spinner/spinner';

export default function ProtectedRoute({ children }) { 

    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        } 
    }, [user, loading]);

    if (loading) {
        return <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}><Spinner/></div>;
    }

    if (!user) {
        return  <div>user is not present</div>; // Prevent flashing content
    }

    return children;
}
