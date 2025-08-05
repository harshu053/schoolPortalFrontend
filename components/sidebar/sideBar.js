import styles from './Sidebar.module.css';
import { Home, Users, Folder, Calendar, FileText, PieChart, Settings } from 'react-feather';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.section}> 
        <div className={styles.link + ' ' + styles.active}>
          <Home className={styles.icon} />
          <span>Dashboard</span>
        </div>
        <div className={styles.link}>
          <Users className={styles.icon} />
          <span>Students</span>
        </div>
        <div className={styles.link}>
          <Folder className={styles.icon} />
          <span>Teachers</span>
        </div>
        <div className={styles.link}>
          <Calendar className={styles.icon} />
          <span>Calendar</span>
        </div>
        <div className={styles.link}>
          <FileText className={styles.icon} />
          <span>Documents</span>
        </div>
        <div className={styles.link}>
          <PieChart className={styles.icon} />
          <span>Payrolls</span>
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.heading}>Your teams</p>
        {['Heroicons', 'Tailwind Labs', 'Workcation'].map((team) => (
          <div key={team} className={styles.team}>
            <span className={styles.teamInitial}>{team.charAt(0)}</span>
            <span>{team}</span>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <div className={styles.link}>
          <Settings className={styles.icon} />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
