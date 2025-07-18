import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Landing.module.css';
import Link from 'next/link';

export default function Home() {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && user) {
            // If user is already logged in, redirect to dashboard
            switch (user.role) {
                case 'superadmin':
                    router.replace('/admin/dashboard');
                    break;
                case 'schoolAdmin':
                case 'principal':
                    router.replace('/school/dashboard');
                    break;
                case 'teacher':
                    router.replace('/teacher/dashboard');
                    break;
                default:
                    router.replace('/dashboard');
            }
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    // If no user is logged in, show the landing page
    if (!user) {
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

    return null; // Return null as the useEffect will handle the redirect
}


