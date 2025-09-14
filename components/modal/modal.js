import styles from "./modal.module.scss";
import { useEffect, useState } from "react";
import { messageBus } from "@/utils/pubsub";
import Icon from "../icon/icon";

export default function Modal() {
  const [open, setOpen] = useState(false);
  const [template, setTemplate] = useState(null);
  const [modifierClass, setModifierClass] = useState('');

  const handleModal = (event) => {
    switch (event["event_name"]) {
      case "OPEN_MODAL":
        setOpen(true);
        
        setTemplate(event.data);

        if (event?.modifier_class?.length > 0) {
          setModifierClass(event.modifier_class);
        }

        break;
      case "CLOSE_MODAL":
        setOpen(false);
        setTemplate(null);
        break;
    }
  };

  useEffect(() => {
    messageBus.subscribe("app__modal", handleModal);
    return () => {
      messageBus.unsubscribe("app__modal", handleModal);
    };
  }, []);

  const handleModalClose = () => {
    messageBus.publish("app__modal", { event_name: "CLOSE_MODAL" });
  };

  return (
    open && (
      <div className={styles.modal} >
        <div className={styles.modal__overlay} >
          <div className={`${styles.modal__content} ${modifierClass.length > 0 ? styles[`modal__content--${modifierClass}`] : ''}`}>
            <div className={`${styles.modal__topbar} ${modifierClass.length > 0 ? styles[`modal__topbar--${modifierClass}`] : ''}`}>
              <button className={styles.modal__closeButton} onClick={() => handleModalClose()}>
                <Icon iconName='IcClose'></Icon>
              </button>
            </div>
            <div className={styles['modal__template']}>
              {template}
            </div>
          </div>
        </div>

        <div className={styles["modal__template-mobile"]}>{template}</div>
      </div>
    )
  );
}
