import React from 'react';
import styles from './menu.module.scss';
import Icon from '../icon/icon';
import { useRouter } from 'next/router';

const navOptions = [
  { label: 'Dashboard', href: '/dashboard', icon: 'IcHome' },
  { label: 'Enrollments', href: '/enrollments', icon: 'IcAdd' },
  { label: 'Students', href: '/students', icon: 'IcStudent' },
  { label: 'Teachers', href: '/teachers', icon: 'IcTeacher' },
  { label: 'Fee Details', href: '/fee-details', icon: 'IcRupee' },
  { label: 'Calendar', href: '/calendar', icon: 'IcHome' },
  { label: 'Payrolls', href: '/payrolls', icon: 'IcPayroll' },
  { label: 'Settings', href: '/settings', icon: 'IcSetting' },
];

const Menu = ({setShowMenu}) => {
  const router = useRouter();
  const handleNavigate = (href) => {
    setShowMenu(false);
    router.push(href);
  };

  const handleOutsideClick = () => {
    setShowMenu(false);
  };

  return (
    <div className={styles.continerMenu} onClick={handleOutsideClick}>
      <div className={styles.menuNav} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleOutsideClick}>
          <Icon iconName={"IcClose"} />
        </button>
        {navOptions.map((opt) => (
          <button
            key={opt.href}
            className={styles.menuNavItem}
            onClick={() => handleNavigate(opt.href)}
          >
            <Icon iconName={opt.icon} />
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;