import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import styles from './Login.module.scss';
import Spinner from '@/components/spinner/spinner';

export default function LoginPage() {
    const [schoolEmail, setSchoolEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
        
            const userData = await login(schoolEmail, password);  
            
            // Clear any previous error
            setError('');
            if(!userData)return <Spinner/>;
            // Redirect based on user role
            if (userData.role === 'admin') {
                router.push('/superAdmin');
            } else router.push('/dashboard'); 
            
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className={styles['login-container']}>
            <div className={styles['login-box']}>
                <h2 className={styles['login-title']}>
                    School Portal Login
                </h2>
                
                {error && (
                    <div className={styles['error-message']}>
                        {error}
                    </div>
                )}

                <form className={styles['form-container']} onSubmit={handleSubmit}>
                    <div className={styles['form-group']}>
                        <label htmlFor="email" className={styles['form-label']}>
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className={styles['form-input']}
                            value={schoolEmail}
                            onChange={(e) => setSchoolEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles['form-group']}>
                        <label htmlFor="password" className={styles['form-label']}>
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className={styles['form-input']}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={styles['submit-button']}
                    >
                        {loading && <div className={styles['loading-spinner']} />}
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
                <Link href="/" className={styles.backLink}>
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
