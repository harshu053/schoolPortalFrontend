import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";
import styles from "./Navigation.module.scss";
import Icon from "../icon/icon";
import DropdownInput from "../dropdowninput/dropdowninput";
import { useAcademicYear } from "@/contexts/academicYearContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // <-- add this

export default function Navigation({ text }) {
  const router = useRouter(); // <-- router instance
  const { user, hasPermission, logout, schoolDeatils } = useAuth();
  const { academicYearId, academicYear, years, switchYear } = useAcademicYear();
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(academicYear);

  useEffect(() => { setSelectedAcademicYear(academicYear); }, [academicYear]);

  useEffect(() => {
    const changeYear = async () => {
      if (selectedAcademicYear && selectedAcademicYear._id !== academicYearId) {
        await switchYear(selectedAcademicYear._id);
      }
    };
    changeYear();
  }, [selectedAcademicYear]);

  const getSelectedyear = (value) => {
    setSelectedAcademicYear(value);
  };

  if (!user) return null;

  // go back one step; if there's no history, go to dashboard
  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.navLinks}>
          {/* Back arrow: use a button that navigates back step-by-step */}
          <button
            onClick={handleBack}
            className={styles.backIcon}
            aria-label="Go back"
            type="button"
          >
            <Icon iconName="IcArrowback" />
          </button>

          <Link href="/dashboard">
            <span className={styles.navLink}>{text?.toUpperCase()}</span>
          </Link>

          {/* Super Admin Features */}
          {user.role === "superadmin" && (
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

        <div className={styles.rightSection}>
          <div className={styles.dropDownContainer}>
            <DropdownInput
              setSelectedValue={getSelectedyear}
              inputValues={years}
              placeholder={selectedAcademicYear?.year}
              required={false}
              selectedValue={selectedAcademicYear?.year}
              displayName="year"
            />
          </div>
          <div className={styles.actionsContainer}>
            <button onClick={logout} className={styles.logoutButton}>
              <Icon iconName="IcLogout" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}





// import { useAuth } from "../../contexts/AuthContext";
// import Link from "next/link";
// import styles from "./Navigation.module.scss";
// import Icon from "../icon/icon";
// import DropdownInput from "../dropdowninput/dropdowninput";
// import { useAcademicYear } from "@/contexts/academicYearContext";
// import { useEffect, useState } from "react";

// export default function Navigation({ text }) {
//   const { user, hasPermission, logout,schoolDeatils } = useAuth();
//   const { academicYearId, academicYear, years, switchYear } = useAcademicYear(); 
//   const [selectedAcademicYear, setSelectedAcademicYear] =useState(academicYear); 
  
//   useEffect(()=>{setSelectedAcademicYear(academicYear)},[academicYear]);
//   useEffect(() => {
//     const changeYear = async () => {
//       if (selectedAcademicYear && selectedAcademicYear._id !== academicYearId) {
//         await switchYear(selectedAcademicYear._id);
//       }
//     };
//     changeYear();
//   }, [selectedAcademicYear]);

//   const getSelectedyear = (value) => { 
//     setSelectedAcademicYear(value);
//   };
 
//   if (!user) return null;

//   return ( 
//     <nav className={styles.nav}>
//       <div className={styles.container}>  
//         <div className={styles.navLinks}>
//           <Link href="/dashboard">
//             <span className={styles.backIcon}>
//               <Icon iconName="IcArrowback" />
//             </span>
//           </Link>

//           <Link href="/dashboard">
//             <span className={styles.navLink}>{text?.toUpperCase()}</span>
//           </Link>

  

//           {/* Super Admin Features */}
//           {user.role === "superadmin" && (
//             <>
//               <Link href="/schools">
//                 <span className={styles.navLink}>Schools</span>
//               </Link>
//               <Link href="/subscriptions">
//                 <span className={styles.navLink}>Subscriptions</span>
//               </Link>
//             </>
//           )}
//         </div>

 
//         <div className={styles.rightSection}>
//           <div className={styles.dropDownContainer}>
//             <DropdownInput
//               setSelectedValue={getSelectedyear}
//               inputValues={years}
//               placeholder={selectedAcademicYear?.year}
//               required={false} 
//               selectedValue={selectedAcademicYear?.year}
//               displayName="year" 
//             />
//           </div>
//           <div className={styles.actionsContainer}>
//             <button onClick={logout} className={styles.logoutButton}>
//               <Icon iconName="IcLogout" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
