import React, { useState } from "react";
import styles from "./teacherEnrollments.module.scss";
import { useAcademicYear } from "@/contexts/academicYearContext";
import { useAuth } from "@/contexts/AuthContext";
import { addTeacherService } from "@/services/teacherServices";

const TeacherForm = () => {
  const [step, setStep] = useState(1);
  
  const [subjectInput, setSubjectInput] = useState("");
  const {academicYearId}=useAcademicYear();
  const {user}=useAuth();
  const schoolId=user?.schoolId;
  const [formData, setFormData] = useState({
    academicYearId,
    schoolId,
    name: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    fatherOrSpouseName: "",
    fatherOrSpouseOccupation: "",
    email: "",
    phone: "",
    address: "",
    education: [],
    experience: [],
    subjects: [],
    category: "",
  });



  // Subjects list (you can fetch from DB later)
  const subjectOptions = [
    "Mathematics",
    "Science",
    "English",
    "Hindi",
    "Social Studies",
    "Computer Science",
    "Physical Education",
    "Arts",
    "Music",
    "History",
    "Geography",
  ];

  // Add subject
  const addSubject = () => {
    if (subjectInput && !formData.subjects.includes(subjectInput)) {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, subjectInput],
      });
      setSubjectInput("");
    }
  };

  // Remove subject
  const removeSubject = (index) => {
    const updated = [...formData.subjects];
    updated.splice(index, 1);
    setFormData({ ...formData, subjects: updated });
  };

  const [educationInput, setEducationInput] = useState({
    school: "",
    degree: "",
    yearOfPassing: "",
    percentage: "",
  });

  const [experienceInput, setExperienceInput] = useState({
    organization: "",
    role: "",
    from: "",
    to: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add Education
  const addEducation = () => {
    if (
      educationInput.school &&
      educationInput.degree &&
      educationInput.yearOfPassing
    ) {
      setFormData({
        ...formData,
        education: [...formData.education, educationInput],
      });
      setEducationInput({
        school: "",
        degree: "",
        yearOfPassing: "",
        percentage: "",
      });
    }
  };

  const removeEducation = (index) => {
    const updated = [...formData.education];
    updated.splice(index, 1);
    setFormData({ ...formData, education: updated });
  };

  // Add Experience
  const addExperience = () => {
    if (experienceInput.organization && experienceInput.role) {
      setFormData({
        ...formData,
        experience: [...formData.experience, experienceInput],
      });
      setExperienceInput({ organization: "", role: "", from: "", to: "" });
    }
  };

  const removeExperience = (index) => {
    const updated = [...formData.experience];
    updated.splice(index, 1);
    setFormData({ ...formData, experience: updated });
  };

    // Navigation
  const nextStep = () => setStep((s) => Math.min(4, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));


  const handleSubmit =async (e) => {
      e.preventDefault(); 
      
      // Teacher details 
      const payload = {
        academicYearId,    
        data: formData 
      }; 
      addTeacherService(payload); 
    };

 

  return (
    <div className={styles.container}> 
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Personal Info */}
        { step=="1" &&<div className={styles.section}>
          <h2 className={styles.sectionTitle}>Personal Information</h2>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label>Marital Status</label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
            >
              <option value="">-- Select --</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label>Father/Spouse Name</label>
            <input
              type="text"
              name="fatherOrSpouseName"
              value={formData.fatherOrSpouseName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Father/Spouse Occupation</label>
            <input
              type="text"
              name="fatherOrSpouseOccupation"
              value={formData.fatherOrSpouseOccupation}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">-- Select Category --</option>
              <option value="OBC">OBC</option>
              <option value="SC/ST">SC/ST</option>
              <option value="General">General</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          
          </div>

          <div className={styles.inputGroup}> 
            <label>Select Subject</label>
            <select
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
            >
              <option value="">-- Select Subject --</option>
              {subjectOptions.map((subj, idx) => (
                <option key={idx} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
            <button className={styles.addSubjectBtn} type="button" onClick={addSubject}>
              + Add Subject
            </button>

            <ul className={styles.subjectList}>
              {formData.subjects.map((subj, idx) => (
                <li key={idx}>
                  {subj}{" "}
                  <button type="button" className={styles.removeBtn} onClick={() => removeSubject(idx)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.actions}> 
              <button type="button" onClick={nextStep}>Next</button>
          </div>
        </div>}

        {/* Education Section */}
        {step=="2" &&<div className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.inputGroup}>
            <label>School/College</label>
            <input
              type="text"
              value={educationInput.school}
              onChange={(e) =>
                setEducationInput({ ...educationInput, school: e.target.value })
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Degree</label>
            <input
              type="text"
              value={educationInput.degree}
              onChange={(e) =>
                setEducationInput({ ...educationInput, degree: e.target.value })
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Year of Passing</label>
            <input
              type="number"
              value={educationInput.yearOfPassing}
              onChange={(e) =>
                setEducationInput({
                  ...educationInput,
                  yearOfPassing: e.target.value,
                })
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Percentage</label>
            <input
              type="number"
              value={educationInput.percentage}
              onChange={(e) =>
                setEducationInput({
                  ...educationInput,
                  percentage: e.target.value,
                })
              }
            />
          </div>
          <div className={styles.buttonRow}>
            <button
              type="button"
              className={styles.addBtn}
              onClick={addEducation}
            >
              + Add Education
            </button>
          </div>
          <div className={styles.list}>
            {formData.education.map((edu, idx) => (
              <div key={idx} className={styles.listItem}>
                <span>
                  {edu.degree} at {edu.school} ({edu.yearOfPassing})
                </span>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeEducation(idx)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className={styles.actions}>
              <button type="button" onClick={prevStep}>Previous</button>
              <button type="button" onClick={nextStep}>Next</button>
            </div>
        </div>}

        {/* Experience Section */}
        { step=="3" &&<div className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.inputGroup}>
            <label>Organization</label>
            <input
              type="text"
              value={experienceInput.organization}
              onChange={(e) =>
                setExperienceInput({
                  ...experienceInput,
                  organization: e.target.value,
                })
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Role</label>
            <input
              type="text"
              value={experienceInput.role}
              onChange={(e) =>
                setExperienceInput({ ...experienceInput, role: e.target.value })
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label>From</label>
            <input
              type="date"
              value={experienceInput.from}
              onChange={(e) =>
                setExperienceInput({ ...experienceInput, from: e.target.value })
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label>To</label>
            <input
              type="date"
              value={experienceInput.to}
              onChange={(e) =>
                setExperienceInput({ ...experienceInput, to: e.target.value })
              }
            />
          </div>
          <div className={styles.buttonRow}>
            <button
              type="button"
              className={styles.addBtn}
              onClick={addExperience}
            >
              + Add Experience
            </button>
          </div>
          <div className={styles.list}>
            {formData.experience.map((exp, idx) => (
              <div key={idx} className={styles.listItem}>
                <span>
                  {exp.role} at {exp.organization} ({exp.from} - {exp.to})
                </span>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeExperience(idx)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className={styles.actions}>
              <button type="button" onClick={prevStep}>Previous</button>
              <button type="submit" className={styles.submitBtn}>Submit Form</button>
            </div>
        </div>}
      </form>
    </div>
  );
};

export default TeacherForm;
