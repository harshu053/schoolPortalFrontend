import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import Spinner from "@/components/spinner/spinner";
import styles from "../styles/Landing.module.scss";

export default function Home() {
  const router = useRouter();
  const { user, loading, handleDemoLogin } = useAuth();

  // ✅ all hooks must be at the top
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [form, setForm] = useState({
    schoolName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleDemoUser = async () => {
    const demoLogin = await handleDemoLogin();
    if (!demoLogin) return <Spinner />;
    router.push("/dashboard");
  };

  const validate = () => {
    if (!form.schoolName.trim()) return "School name is required";
    if (!form.email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Invalid email";
    if (!form.message.trim()) return "Please enter your query";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setIsFormVisible((prev) => !prev);
    alert("Query submitted");
  };

  // ✅ conditional rendering should be *after* hooks
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}>
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to School Portal</h1>
      <p className={styles.subtitle}>
        A comprehensive solution for managing your educational institution
      </p>

      {!isFormVisible && (
        <div className={styles.optionsContainer}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🏫</div>
            <h2 className={styles.cardTitle}>New School?</h2>
            <p className={styles.cardDescription}>
              Register your school with us and get access to our comprehensive
              school management system.
            </p>
            <div className={styles.buttonsContainer}>
              <button
                className={`${styles.button} ${styles.primaryButton}`}
                onClick={() => setIsFormVisible(true)}
              >
                Contact Us
              </button>
              <button
                onClick={() => handleDemoUser()}
                className={`${styles.button} ${styles.secondaryButton}`}
              >
                Try Demo
              </button>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>🔑</div>
            <h2 className={styles.cardTitle}>Already Registered?</h2>
            <p className={styles.cardDescription}>
              Sign in to access your school's dashboard and manage your
              institution.
            </p>
            <Link href="/login">
              <button className={`${styles.button} ${styles.secondaryButton}`}>
                Sign In
              </button>
            </Link>
          </div>
        </div>
      )}

      {isFormVisible && (
        <div className={styles.wrapper}>
          <div className={styles.formCard}>
            <h1 className={styles.title}>Contact Us</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
              <label>
                School Name
                <input
                  type="text"
                  name="schoolName"
                  value={form.schoolName}
                  onChange={handleChange}
                  placeholder="Enter school name"
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </label>

              <label>
                Contact Number
                <input
                  type="tel"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                  required
                />
              </label>

              <label>
                Your Query
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message or query..."
                  rows={5}
                  required
                />
              </label>

              <button type="submit" disabled={status?.type === "loading"}>
                {status?.type === "loading" ? "Sending..." : "Submit"}
              </button>

              {status && status.type !== "loading" && (
                <div
                  className={
                    status.type === "success"
                      ? styles.successMsg
                      : styles.errorMsg
                  }
                >
                  {status.text}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
