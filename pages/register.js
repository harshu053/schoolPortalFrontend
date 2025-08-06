import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import styles from '../styles/register.module.scss';

export default function Register() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        schoolName: '',
        diceCode: '',
        type: 'public',
        landmark: '',
        city: '',
        state: '',
        pinCode: '',
        schoolEmail: '',
        schoolPhone: '',
        principalName: '',
        adminEmail: '',
        adminPhone: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            schoolName: formData.schoolName,
            diceCode: formData.diceCode,
            type: formData.type,
            address: {
                landmark: formData.landmark,
                city: formData.city,
                state: formData.state,
                pinCode: formData.pinCode
            },
            contact: {
                schoolEmail: formData.schoolEmail,
                schoolPhone: formData.schoolPhone
            },
            password: formData.password,
            adminInfo: {
                principalName: formData.principalName,
                schoolEmail: formData.adminEmail,
                schoolPhone: formData.adminPhone
            }
        };

        try {
            const res = await fetch('http://localhost:5000/api/schools/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success) {
                toast.success('School registered successfully!');
                router.push('/login');
            } else {
                toast.error(data.message || 'Registration failed');
            }
        } catch (error) {
            toast.error('An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerFormWrapper}>
                <h2 className={styles.registerTitle}>Register your school</h2>
                <form className={styles.registerForm} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="schoolName" className={styles.formLabel}>School Name</label>
                        <input
                            id="schoolName"
                            name="schoolName"
                            type="text"
                            required
                            className={styles.formInput}
                            value={formData.schoolName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="diceCode" className={styles.formLabel}>DICE Code</label>
                        <input
                            id="diceCode"
                            name="diceCode"
                            type="text"
                            required
                            pattern="[0-9]{11}"
                            title="Please enter a valid 11-digit DICE code"
                            className={styles.formInput}
                            value={formData.diceCode}
                            onChange={handleChange}
                        />
                        <p className={styles.formHelper}>Enter your 11-digit DICE code</p>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="landmark" className={styles.formLabel}>Address Landmark</label>
                        <input
                            id="landmark"
                            name="landmark"
                            type="text"
                            required
                            className={styles.formInput}
                            value={formData.landmark}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.gridTwo}>
                        <div className={styles.formGroup}>
                            <label htmlFor="city" className={styles.formLabel}>City</label>
                            <input
                                id="city"
                                name="city"
                                type="text"
                                required
                                className={styles.formInput}
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="state" className={styles.formLabel}>State</label>
                            <input
                                id="state"
                                name="state"
                                type="text"
                                required
                                className={styles.formInput}
                                value={formData.state}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="pinCode" className={styles.formLabel}>PIN Code</label>
                        <input
                            id="pinCode"
                            name="pinCode"
                            type="text"
                            required
                            pattern="[0-9]{6}"
                            title="Please enter a valid 6-digit PIN code"
                            className={styles.formInput}
                            value={formData.pinCode}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="schoolEmail" className={styles.formLabel}>School Contact Email</label>
                        <input
                            id="schoolEmail"
                            name="schoolEmail"
                            type="email"
                            required
                            className={styles.formInput}
                            value={formData.schoolEmail}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="schoolPhone" className={styles.formLabel}>School Contact Phone</label>
                        <input
                            id="schoolPhone"
                            name="schoolPhone"
                            type="tel"
                            required
                            pattern="[0-9]{10}"
                            title="Please enter a valid 10-digit phone number"
                            className={styles.formInput}
                            value={formData.schoolPhone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="principalName" className={styles.formLabel}>Principal Name</label>
                        <input
                            id="principalName"
                            name="principalName"
                            type="text"
                            required
                            className={styles.formInput}
                            value={formData.principalName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="adminEmail" className={styles.formLabel}>Principal Email</label>
                        <input
                            id="adminEmail"
                            name="adminEmail"
                            type="email"
                            required
                            className={styles.formInput}
                            value={formData.adminEmail}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="adminPhone" className={styles.formLabel}>Principal Phone</label>
                        <input
                            id="adminPhone"
                            name="adminPhone"
                            type="tel"
                            required
                            pattern="[0-9]{10}"
                            title="Please enter a valid 10-digit phone number"
                            className={styles.formInput}
                            value={formData.adminPhone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.formLabel}>Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className={styles.formInput}
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="type" className={styles.formLabel}>School Type</label>
                        <select
                            id="type"
                            name="type"
                            required
                            className={styles.formSelect}
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                            <option value="primary">Primary</option>
                            <option value="secondary">Secondary</option>
                            <option value="highschool">High School</option>
                            <option value="k-12">K-12</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={styles.submitButton}
                    >
                        {loading ? 'Registering...' : 'Register School'}
                    </button>
                </form>
                <Link href="/" className={styles.backLink}>
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
