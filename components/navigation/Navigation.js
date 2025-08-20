import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import styles from './Navigation.module.scss';
import Icon from '../icon/icon'; 

export default function Navigation({text}) {
    const { user, hasPermission, logout } = useAuth();

    if (!user) return null; 

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <div className={styles.navLinks}>

                    <Link href="/dashboard">
                        <span className={styles.backIcon}><Icon iconName='IcArrowback'/></span>
                    </Link>

                    <Link href="/dashboard">
                        <span className={styles.navLink}>{text.toUpperCase()}</span>
                    </Link>

                    {/* Student Management */}
                    {hasPermission('view_students') && (
                        <Link href="/students">
                            <span className={styles.navLink}>Students</span>
                        </Link>
                    )}

                    {/* Teacher Management */}
                    {hasPermission('view_teachers') && (
                        <Link href="/teachers">
                            <span className={styles.navLink}>Teachers</span>
                        </Link>
                    )}

                    {/* Staff Management */}
                    {hasPermission('view_staff') && (
                        <Link href="/staff">
                            <span className={styles.navLink}>Staff</span>
                        </Link>
                    )}

                    {/* Classes */}
                    {hasPermission('view_classes') && (
                        <Link href="/classes">
                            <span className={styles.navLink}>Classes</span>
                        </Link>
                    )}

                    {/* Attendance */}
                    {hasPermission('view_attendance') && (
                        <Link href="/attendance">
                            <span className={styles.navLink}>Attendance</span>
                        </Link>
                    )}

                    {/* School Settings - Only for admin/principal */}
                    {hasPermission('manage_school_settings') && (
                        <Link href="/settings">
                            <span className={styles.navLink}>Settings</span>
                        </Link>
                    )}

                    {/* Super Admin Features */}
                    {user.role === 'superadmin' && (
                        <>
                            <Link href="/schools">
                                <span className={styles.navLink}>Schools</span>
                            </Link>
                            <Link href="/subscriptions">
                                <span className={styles.navLink}>Subscriptions</span>
                            </Link>
                        </>
                    )}
                </div>

                <div className={styles.actionsContainer}>
                    <span>{user.name}</span>
                    <button
                        onClick={logout}
                        className={styles.logoutButton}
                    >
                         <Icon iconName="IcLogout"/>
                    </button>
                </div>
            </div>
        </nav>
    );
}
