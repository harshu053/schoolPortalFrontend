import { AcademicYearProvider } from "@/contexts/academicYearContext";
import { AuthProvider } from "../contexts/AuthContext";
// import "@/styles/globals.scss";
import "../styles/main.scss";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AcademicYearProvider>
        <Component {...pageProps} />
      </AcademicYearProvider>
    </AuthProvider>
  );
}
