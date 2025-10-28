import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import Spinner from './spinner/spinner';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // ✅ Only redirect when loading is done AND user is definitely null
    if (!loading && user === null) {
      router.replace('/login'); // use replace() to prevent back navigation loop
    }
  }, [user, loading, router]);

  // ✅ While loading, show spinner
  if (loading || user === undefined) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <Spinner />
      </div>
    );
  }

  // ✅ If user is not found even after loading
  if (!user) {
    return null; // avoid flashing "user is not present"
  }

  return children;
}
