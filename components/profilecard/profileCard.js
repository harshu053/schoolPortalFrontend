import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './profileCard.module.css';
import Link from 'next/link'; 
// { name, className, imageUrl, onEdit, onDelete }

export default function ProfileCard({user, onEdit, onDelete, cardTtype }) {

  const Id= cardTtype=='studentCard'? user?.studentId : user?.employeeId; 

  return (
    <div className={styles.card} >
      {/* Profile Image */}
      <img
        src={user?.imageUrl||''}
        alt={user?.name || 'Profile Image'}
        className={styles.profileImage}
      />

      {/* Info */}
      <div className={styles.info}>
        <p className={styles.name}>{user.name}</p>
        <p className={styles.className}>Class: {user.class}{user.section}</p>
      </div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button
          onClick={()=>onEdit(Id, cardTtype)}
          className={`${styles.iconButton} ${styles.edit}`}
          aria-label="Edit"
        >
          <FaEdit size={18} />
        </button>
        <button
          onClick={()=>onDelete(Id, cardTtype)}
          className={`${styles.iconButton} ${styles.delete}`}
          aria-label="Delete"
        >
          <FaTrash size={18} />
        </button>
      </div>
    </div>
  );
}
