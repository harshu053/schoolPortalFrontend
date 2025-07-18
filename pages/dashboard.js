import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import ProtectedRoute from '../components/ProtectedRoute';
import styles from '../styles/Dashboard.module.css';

export default function DashboardPage() {
    console.log("Dashboard user:", useAuth());
    const { user } = useAuth();

    console.log("Dashboard user:", user);

    return (
        <ProtectedRoute>
            <div className={styles.container}>
                <Navigation />
                
                <main className={styles.main}>
                    <div className={styles.content}>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h1 className={styles.title}>
                                    Welcome, {user?.name}!
                                </h1>
                                
                                <div className={styles.cardBody}>
                                    <div className={styles.statsGrid}>
                                        {/* Quick Stats */}
                                        {(user?.role === 'schoolAdmin' || user?.role === 'principal') && (
                                            <>
                                                <div className={`${styles.statsCard} ${styles.blue}`}>
                                                    <div className={styles.statsContent}>
                                                        <div className={`${styles.statsIcon} ${styles.blue}`}>
                                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                            </svg>
                                                        </div>
                                                        <div className={styles.statsInfo}>
                                                            <dt className={`${styles.statsLabel} ${styles.blue}`}>
                                                                Total Students
                                                            </dt>
                                                            <dd className={`${styles.statsValue} ${styles.blue}`}>
                                                                --
                                                            </dd>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={`${styles.statsCard} ${styles.green}`}>
                                                    <div className={styles.statsContent}>
                                                        <div className={`${styles.statsIcon} ${styles.green}`}>
                                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                            </svg>
                                                        </div>
                                                        <div className={styles.statsInfo}>
                                                            <dt className={`${styles.statsLabel} ${styles.green}`}>
                                                                Total Teachers
                                                            </dt>
                                                            <dd className={`${styles.statsValue} ${styles.green}`}>
                                                                --
                                                            </dd>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {user?.role === 'teacher' && (
                                            <div className={`${styles.statsCard} ${styles.yellow}`}>
                                                <div className={styles.statsContent}>
                                                    <div className={`${styles.statsIcon} ${styles.yellow}`}>
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                                        </svg>
                                                    </div>
                                                    <div className={styles.statsInfo}>
                                                        <dt className={`${styles.statsLabel} ${styles.yellow}`}>
                                                            Today's Classes
                                                        </dt>
                                                        <dd className={`${styles.statsValue} ${styles.yellow}`}>
                                                            --
                                                        </dd>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
