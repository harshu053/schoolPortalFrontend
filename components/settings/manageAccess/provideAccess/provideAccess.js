import { useState } from "react";
import styles from "./provideAccess.module.scss";
import { enrollmentsTypeList } from "@/constants/app.constants";
import { createUserService } from "@/services/schoolServices";

export default function ManageAccess({ students, teachers }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeButton, setActiveButton] = useState("Student");

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "teacher",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (user, type) => {
    setSelectedUser({ ...user, type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      name:selectedUser?.type=="student"?selectedUser?.studentName:selectedUser?.name,
      email:selectedUser?.type=="student"?selectedUser.emailId:selectedUser?.email,
      schoolId:selectedUser?.schoolId,
    };
     
    const data=createUserService(payload)

    setSelectedUser(null);
  };

  return (
    <div className={styles.container}>
      {/* button */}
      <div className={styles.informationType}>
        {enrollmentsTypeList?.map((value) => (
          <button
            onClick={() => setActiveButton(value)}
            className={`${styles.buttons} ${
              activeButton === value ? styles.active : ""
            } text-button`}
          >
            {value}
          </button>
        ))}
      </div>

      {/* Students List */}
      {activeButton == "Student" && (
        <div className={styles.section}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students?.map((s) => (
                <tr key={s._id}>
                  <td>{s.studentName}</td>
                  <td>{s.emailId}</td>
                  <td>
                    <button
                      className={styles.assignBtn}
                      onClick={() => handleSelect(s, "student")}
                    >
                      Provide Access
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Teachers List */}
      {activeButton == "Teacher" && (
        <div className={styles.section}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers?.map((t) => (
                <tr key={t._id}>
                  <td>{t.name}</td>
                  <td>{t.email}</td>
                  <td>
                    <button
                      className={styles.assignBtn}
                      onClick={() => handleSelect(t, "teacher")}
                    >
                      Provide Access
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Access Form */}
      {selectedUser && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Provide Access to {selectedUser?.type=="student"?selectedUser.studentName:selectedUser.name}</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input type="email" value={selectedUser?.type=="student"?selectedUser.emailId:selectedUser?.email} disabled />
              </div>

              <div className={styles.formGroup}>
                <label>Role</label>
                <select name="role" value={form.role} onChange={handleChange}>
                  <option value="teacher">Teacher</option>
                  <option value="administration">Administration</option>
                  <option value="student">Student</option>
                  <option value="staff">Staff</option>
                  {/* 'teacher', 'principal', 'administration','superAdmin','student','staff','admin' */}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.actions}>
                <button type="submit" className={styles.saveBtn}>
                  Save Access
                </button>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setSelectedUser(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
