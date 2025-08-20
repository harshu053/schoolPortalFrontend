import styles from "./spinner.module.scss";
import { useEffect, useState } from "react"; 

export default function Spinner({ showSpinner }) {
  const [show, setShow] = useState(showSpinner);

  // const handleLoader = (event) => {
  //   switch (event["event_name"]) {
  //     case "SHOW_SPINNER":
  //       setShow(true);
  //       break;
  //     case "HIDE_SPINNER":
  //       setShow(false);
  //       break;
  //   }
  // };
  // useEffect(() => {
  //   const loaderId = messageBus.subscribe("app__loader", handleLoader);

  //   return () => {
  //     messageBus.unsubscribe("app__loader", loaderId);
  //   };
  // }, []);

  return (
    show && (
      <>
        <div className={styles["spinner-container"]}>
          <div className={styles["j-spinner-circles"]}>
            <svg className={`${styles["circle"]} ${styles["circle-0"]}`} viewBox="0 0 28 28">
              <circle fill="none" strokeWidth="4" strokeLinecap="round" cx="14" cy="14" r="12" />
            </svg>
            <svg className={`${styles["circle"]} ${styles["circle-1"]}`} viewBox="0 0 28 28">
              <circle fill="none" strokeWidth="4" strokeLinecap="round" cx="14" cy="14" r="12" />
            </svg>
          </div>
        </div>
        {/* <div className={styles["spinner-backdrop"]}></div> */}
      </>
    )
  );
}
