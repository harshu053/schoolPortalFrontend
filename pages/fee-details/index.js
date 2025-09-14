import React, { useState, useEffect } from "react";
import Navigation from "../../components/navigation/Navigation";
import styles from "./fee.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import FeesMainConatiner from "@/components/feeDetails/fee";
import Spinner from "@/components/spinner/spinner";

const FeeSturtures = () => {
  const { user, hasPermission } = useAuth();
  const [access, setAccess] = useState(null);

  useEffect(() => {
    if (!user) return;
    const allowedRoles = ["principal", "superAdmin", "administration"];
    setAccess(hasPermission(allowedRoles));
  }, [user]);

  if (access === null) {
    return <Spinner />;
  }

  return (
    <div className={styles.feesContainer}>
      <Navigation text="Fees Managments" />
      <div className={styles.Container}>
        {access ? (
          <FeesMainConatiner />
        ) : (
          <div className={styles.message}>
            <h2>access denied</h2>
            <h4>please contact your schools principle for the access.</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeeSturtures;
