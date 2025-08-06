import React, { useState } from "react";
import styles from "./teacher.module.css";


const TeacherDetail = ({ teacher, onClose, onSave }) => {
  const [section, setSection] = useState("experience");
  const [detail, setDetail] = useState("contact-Deatils");
  const [isEditing, setIsEditing] = useState(false);
  // Local state for editable fields
  const [formData, setFormData] = useState(() => ({
    employeeId: teacher?.employeeId || "",
    gender: teacher?.gender || "",
    name: teacher?.name || "",
    dateOfBirth: teacher?.dateOfBirth || "",
    professionalInfo: {
      experience: [
        {
          fromYear: teacher?.professionalInfo?.experience?.[0]?.fromYear || "",
          toYear: teacher?.professionalInfo?.experience?.[0]?.toYear || "",
          institution: teacher?.professionalInfo?.experience?.[0]?.institution || "",
          position: teacher?.professionalInfo?.experience?.[0]?.position || "",
        },
      ],
      currentPosition: teacher?.professionalInfo?.currentPosition || "",
      qualification: [
        {
          institution: teacher?.professionalInfo?.qualification?.[0]?.institution || "",
          degree: teacher?.professionalInfo?.qualification?.[0]?.degree || "",
          specialization: teacher?.professionalInfo?.qualification?.[0]?.specialization || "",
          yearOfCompletion: teacher?.professionalInfo?.qualification?.[0]?.yearOfCompletion || "",
        },
      ],
    },
    contactInfo: {
      Email: teacher?.contactInfo?.email || "",
      phone: teacher?.contactInfo?.phone || "",
      address: {
        street: teacher?.contactInfo?.address?.street || "",
        city: teacher?.contactInfo?.address?.city || "",
        pinCode: teacher?.contactInfo?.address?.pinCode || "",
        state: teacher?.contactInfo?.address?.state || "",
        country: teacher?.contactInfo?.address?.country || "",
      },
    },
    salary:{
      AccountNumber: teacher?.salary?.bankDetails?.accountNumber || "",
      BankName: teacher?.salary?.bankDetails?.bankName || "",
      IfscCode: teacher?.salary?.bankDetails?.ifscCode || "",
      AccountType: teacher?.salary?.bankDetails?.accountType || "",
    }
    // Add bank details if needed
  }));



  // Handle input changes
  const handleChange = (e, path) => {
    const value = e.target.value;
    // Deep update for nested fields
    setFormData((prev) => {
      const newData = { ...prev };
      if (path.length === 1) {
        newData[path[0]] = value;
      } else if (path[0] === "professionalInfo") {
        if (path[1] === "experience") {
          newData.professionalInfo.experience[0][path[2]] = value;
        } else if (path[1] === "qualification") {
          newData.professionalInfo.qualification[0][path[2]] = value;
        } else {
          newData.professionalInfo[path[1]] = value;
        }
      } else if (path[0] === "contactInfo") {
        if (path[1] === "address") {
          newData.contactInfo.address[path[2]] = value;
        } else {
          newData.contactInfo[path[1]] = value;
        }
      }
      return newData;
    });
  };

  // Save handler
  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved Data:", formData);
    if (onSave) {
      onSave(formData);
    }
    // You can add API call here to update teacher info
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.topCard}>
        <div className={styles.profileImage}>
          <img src="/image.jpg" alt="Profile" />
        </div>

        <div className={styles.infoSection}>
          <div className={styles.inputGroup}>
            <label>Employee ID</label>
            <input type="text" value={formData.employeeId} readOnly={!isEditing} onChange={e => handleChange(e, ["employeeId"])} />
          </div>
          <div className={styles.inputGroup}>
            <label>Gender</label>
            <input type="text" value={formData.gender} readOnly={!isEditing} onChange={e => handleChange(e, ["gender"])} />
          </div>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input type="text" value={formData.name} readOnly={!isEditing} onChange={e => handleChange(e, ["name"])} />
          </div>
          <div className={styles.inputGroup}>
            <label>DOB</label>
            <input type="text" value={formData.dateOfBirth} readOnly={!isEditing} onChange={e => handleChange(e, ["dateOfBirth"])} />
          </div>
        </div>

        <div className={styles.buttonGroup}>
          {isEditing ? (
            <button className={styles.editBtn} onClick={handleSave}>Save</button>
          ) : (
            <button className={styles.editBtn} onClick={() => setIsEditing(true)}>Edit</button>
          )}
          <button className={styles.deleteBtn}>Delete</button>
        </div>
      </div>

      <div className={styles.card}>
        <h1 className={styles.title}>Professional Information</h1>
        <div className={styles.tabButtons}>
          <button
            className={`${styles.tab} ${section === "experience" ? styles.activeTab : ""}`}
            onClick={() => setSection("experience")}
          >
            Experience
          </button>
          <button
            className={`${styles.tab} ${section === "currentposition" ? styles.activeTab : ""}`}
            onClick={() => setSection("currentposition")}
          >
            Current Position
          </button>
          <button
            className={`${styles.tab} ${section === "qualification" ? styles.activeTab : ""}`}
            onClick={() => setSection("qualification")}
          >
            Qualification
          </button>
        </div>

        {section === "experience" && (
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label>From Year</label>
              <input readOnly={!isEditing} value={formData.professionalInfo.experience[0].fromYear} onChange={e => handleChange(e, ["professionalInfo", "experience", "fromYear"])} />
            </div>
            <div className={styles.inputGroup}>
              <label>To Year</label>
              <input readOnly={!isEditing} value={formData.professionalInfo.experience[0].toYear} onChange={e => handleChange(e, ["professionalInfo", "experience", "toYear"])} />
            </div>
            <div className={styles.inputGroup}>
              <label>Institution Name</label>
              <input readOnly={!isEditing} value={formData.professionalInfo.experience[0].institution} onChange={e => handleChange(e, ["professionalInfo", "experience", "institution"])} />
            </div>
            <div className={styles.inputGroup}>
              <label>Position</label>
              <input readOnly={!isEditing} value={formData.professionalInfo.experience[0].position} onChange={e => handleChange(e, ["professionalInfo", "experience", "position"])} />
            </div>
          </div>
        )}

        {section === "currentposition" && (
          <div className={styles.inputGroup}>
            <label>Current Position</label>
            <input readOnly={!isEditing} value={formData.professionalInfo.currentPosition} onChange={e => handleChange(e, ["professionalInfo", "currentPosition"])} />
          </div>
        )}

        {section === "qualification" && (
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label>Institute Name</label>
              <input readOnly={!isEditing} value={formData.professionalInfo.qualification[0].institution} onChange={e => handleChange(e, ["professionalInfo", "qualification", "institution"])} />
            </div>
            <div className={styles.inputGroup}>
              <label>Degree Name</label>
              <input readOnly={!isEditing} value={formData.professionalInfo.qualification[0].degree} onChange={e => handleChange(e, ["professionalInfo", "qualification", "degree"])} />
            </div>
            <div className={styles.inputGroup}>
              <label>Specialization</label>
              <input readOnly={!isEditing} value={formData.professionalInfo.qualification[0].specialization} onChange={e => handleChange(e, ["professionalInfo", "qualification", "specialization"])} />
            </div>
            <div className={styles.inputGroup}>
              <label>Year Of Completion</label>
              <input readOnly={!isEditing} value={formData.professionalInfo.qualification[0].yearOfCompletion} onChange={e => handleChange(e, ["professionalInfo", "qualification", "yearOfCompletion"])} />
            </div>
          </div>
        )}
      </div>

      <div className={styles.card}>
        <h2 className={styles.title}>Other Information</h2>
        <div className={styles.tabButtons}>
          <button
            className={`${styles.tab} ${detail === "contact-Deatils" ? styles.activeTab : ""}`}
            onClick={() => setDetail("contact-Deatils")}
          >
            Contact details
          </button>
          <button
            className={`${styles.tab} ${detail === "bank-details" ? styles.activeTab : ""}`}
            onClick={() => setDetail("bank-details")}
          >
            Bank details
          </button>
        </div>

        {detail === "contact-Deatils" && (
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input type="text" readOnly={!isEditing} value={formData.contactInfo.Email} onChange={e => handleChange(e, ["contactInfo", "Email"])} />
            </div>
            <div className={styles.inputGroup}>
              <label>Phone</label>
              <input type="text" readOnly={!isEditing} value={formData.contactInfo.phone} onChange={e => handleChange(e, ["contactInfo", "phone"])} />
            </div>
            <div className={styles.inputGroup}>
              <label>Landmark</label>
              <input type="text" readOnly={!isEditing} value={formData.contactInfo.address.street} onChange={e => handleChange(e, ["contactInfo", "address", "street"])} />
            </div>
            <div className={styles.inputGroup}>
              <label>City</label>
              <input type="text" readOnly={!isEditing} value={formData.contactInfo.address.city} onChange={e => handleChange(e, ["contactInfo", "address", "city"])} />
            </div>
            <div className={styles.inputGroup}>
              <label>Pincode</label>
              <input type="text" readOnly={!isEditing} value={formData.contactInfo.address.pinCode} onChange={e => handleChange(e, ["contactInfo", "address", "pinCode"])} />
            </div>
            <div className={styles.inputGroup}>
              <label>State</label>
              <input type="text" readOnly={!isEditing} value={formData.contactInfo.address.state} onChange={e => handleChange(e, ["contactInfo", "address", "state"])} />
            </div>
            <div className={styles.inputGroup}>
              <label>Country</label>
              <input type="text" readOnly={!isEditing} value={formData.contactInfo.address.country} onChange={e => handleChange(e, ["contactInfo", "address", "country"])} />
            </div>
          </div>
        )}

        {detail === "bank-details" && (
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label>Bank Name</label>
              <input type="text" readOnly={!isEditing} value={formData.salary.BankName} onChange={e => handleChange(e, ["salary", "BankName"])} />
            </div>
            <div className={styles.inputGroup}>
              <label>Account Number</label>
              <input type="text" readOnly={!isEditing} value={formData.salary.AccountNumber} onChange={e => handleChange(e, ["salary", "AccountNumber"])} />
            </div>
            <div className={styles.inputGroup}>
              <label>IFSC Code</label>
              <input type="text" readOnly={!isEditing} value={formData.salary.IfscCode} onChange={e => handleChange(e, ["salary", "IfscCode"])} />
            </div>
            <div className={styles.inputGroup}>
              <label>Account Type</label>
              <input type="text" readOnly={!isEditing} value={formData.salary.AccountType} onChange={e => handleChange(e, ["salary", "AccountType"])} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDetail;
