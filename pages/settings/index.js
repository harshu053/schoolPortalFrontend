import Navigation from "@/components/navigation/Navigation";
import SettingsPage from "@/components/settings/settings";
import Spinner from "@/components/spinner/spinner";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./settings.module.scss"

const index = () => {
  const { user, hasPermission } = useAuth();
  const [access, setAccess] = useState(null);

  useEffect(() => {
    if (!user) return;
    const allowedRoles = ["principal", "superAdmin"];
    setAccess(hasPermission(allowedRoles));
  }, [user]);

  if (access === null) {
    return <Spinner />;
  }
  return (
    <div>
      <Navigation text="Settings" />
      {access ? <SettingsPage /> : <div className={styles.message}>
            <h2>access denied</h2>
            <h4>please contact your schools principle for the access.</h4>
          </div>}
    </div>
  );
};

export default index;
