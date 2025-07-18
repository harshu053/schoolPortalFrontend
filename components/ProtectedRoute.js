import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, permissions = [] }) {
    const { user, loading, hasPermission } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
            return;
        }

        if (!loading && permissions.length > 0) {
            const hasRequiredPermission = permissions.some(permission => 
                hasPermission(permission)
            );

            if (!hasRequiredPermission) {
                router.push('/unauthorized');
            }
        }
    }, [user, loading, permissions]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    if (permissions.length > 0) {
        const hasRequiredPermission = permissions.some(permission => 
            hasPermission(permission)
        );

        if (!hasRequiredPermission) {
            return null;
        }
    }

    return children;
}
