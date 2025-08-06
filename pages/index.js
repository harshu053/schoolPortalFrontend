import Image from "next/image"; 
import Navigation from "@/components/navigation/Navigation";
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Landing.module.scss';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to School Portal</h1>
            <p className={styles.subtitle}>
                A comprehensive solution for managing your educational institution
            </p>

            <div className={styles.optionsContainer}>
                <div className={styles.card}>
                    <div className={styles.cardIcon}>🏫</div>
                    <h2 className={styles.cardTitle}>New School?</h2>
                    <p className={styles.cardDescription}>
                        Register your school with us and get access to our comprehensive school management system.
                    </p>
                    <Link href="/register">
                        <button className={`${styles.button} ${styles.primaryButton}`}>
                            Get Started
                        </button>
                    </Link>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardIcon}>🔑</div>
                    <h2 className={styles.cardTitle}>Already Registered?</h2>
                    <p className={styles.cardDescription}>
                        Sign in to access your school's dashboard and manage your institution.
                    </p>
                    <Link href="/login">
                        <button className={`${styles.button} ${styles.secondaryButton}`}>
                            Sign In
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}


