import React, { useState } from "react";
import styles from "./enrollments.module.scss";
import Icon from "../icon/icon";
import { enrollmentsTypeList } from "@/constants/app.constants";
import { useAuth } from "../../contexts/AuthContext";
import { addStudentService } from "@/services/studentsServices";
import { apibaseUrl } from "@/utils/utils";
import { handleFileUpload } from "@/services/teacherServices";

const Enrollments = () => {
  const { user } = useAuth();
  const schoolId = user?.schoolId;
  const [enrollmentsType, setEnrollmentsType] = useState("Student");
  const [studentImg, setStudentImg] = useState(null);
  const [formData, setFormData] = useState({
    schoolId,
    name: "",
    rollNumber: "",
    class: "",
    section: "",
    dateOfBirth: "",
    gender: "",
    contactInfo: {
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        pinCode: "",
      },
    },
    parentInfo: {
      fatherName: "",
      motherName: "",
      guardianContact: "",
    },
    academicInfo: {
      previousSchool: "",
      academicYear: "",
      admissionDate: "",
    },
    studentImageUrl: "",
  });

  const [formDataTeacher, setFormDataTeacher] = useState({
    contactInfo: {
      address: {
        street: "",
        city: "",
        state: "",
        pinCode: "",
        country: "",
      },
      email: "",
      phone: "",
    },
    professionalInfo: {
      qualification: [
        {
          degree: "",
          institution: "",
          yearOfCompletion: "",
          specialization: "",
        },
      ],
      experience: [
        {
          institution: "",
          position: "",
          fromYear: "",
          toYear: "",
          subject: "",
        },
      ],
      joiningDate: "",
      currentPosition: "",
    },
    classTeacherOf: {
      class: "",
      section: "",
    },
    salary: {
      bankDetails: {
        accountNumber: "",
        bankName: "",
        ifscCode: "",
        accountType: "",
      },
      basic: "",
    },
    status: "Active",
    schoolId: "",
    name: "",
    dateOfBirth: "",
    gender: "",
    schedule: [],
    employeeId: "",
    departemnt: "",
  });

  const [studentImagePreview, setStudentImagePreview] = useState("");

  const [studentErrors, setStudentErrors] = useState({});
  const [teacherErrors, setTeacherErrors] = useState({});

  // Validation function for teacher form
  const validateTeacherForm = () => {
    const errors = {};
    if (!formDataTeacher.employeeId)
      errors.employeeId = "Employee ID is required.";
    if (!formDataTeacher.name) errors.name = "Name is required.";
    if (!formDataTeacher.dateOfBirth)
      errors.dateOfBirth = "Date of Birth is required.";
    if (
      !formDataTeacher.gender ||
      !["Male", "Female"].includes(formDataTeacher.gender)
    )
      errors.gender = "Gender must be Male or Female.";
    if (!formDataTeacher.departemnt)
      errors.departemnt = "Department is required.";
    if (!formDataTeacher.status) errors.status = "Status is required.";
    // Contact Info
    if (!formDataTeacher.contactInfo.email) errors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formDataTeacher.contactInfo.email))
      errors.email = "Invalid email format.";
    if (!formDataTeacher.contactInfo.phone) errors.phone = "Phone is required.";
    else if (!/^\d{10}$/.test(formDataTeacher.contactInfo.phone))
      errors.phone = "Phone must be 10 digits.";
    if (!formDataTeacher.contactInfo.address.street)
      errors.street = "Street is required.";
    if (!formDataTeacher.contactInfo.address.city)
      errors.city = "City is required.";
    if (!formDataTeacher.contactInfo.address.state)
      errors.state = "State is required.";
    if (!formDataTeacher.contactInfo.address.pinCode)
      errors.pinCode = "Pin Code is required.";
    else if (!/^\d{6}$/.test(formDataTeacher.contactInfo.address.pinCode))
      errors.pinCode = "Pin Code must be 6 digits.";
    if (!formDataTeacher.contactInfo.address.country)
      errors.country = "Country is required.";
    // Professional Info
    if (!formDataTeacher.professionalInfo.currentPosition)
      errors.currentPosition = "Current Position is required.";
    if (!formDataTeacher.professionalInfo.joiningDate)
      errors.joiningDate = "Joining Date is required.";
    // Experience
    const exp = formDataTeacher.professionalInfo.experience[0];
    if (!exp.institution)
      errors.expInstitution = "Experience Institution is required.";
    if (!exp.position) errors.expPosition = "Experience Position is required.";
    if (!exp.subject) errors.expSubject = "Experience Subject is required.";
    if (!exp.fromYear) errors.expFromYear = "From Year is required.";
    else if (!/^\d{4}$/.test(exp.fromYear))
      errors.expFromYear = "From Year must be 4 digits.";
    if (!exp.toYear) errors.expToYear = "To Year is required.";
    else if (!/^\d{4}$/.test(exp.toYear))
      errors.expToYear = "To Year must be 4 digits.";
    // Qualification
    const qual = formDataTeacher.professionalInfo.qualification[0];
    if (!qual.degree) errors.qualDegree = "Qualification Degree is required.";
    if (!qual.institution)
      errors.qualInstitution = "Qualification Institution is required.";
    if (!qual.yearOfCompletion)
      errors.qualYear = "Year Of Completion is required.";
    else if (!/^\d{4}$/.test(qual.yearOfCompletion))
      errors.qualYear = "Year Of Completion must be 4 digits.";
    if (!qual.specialization)
      errors.qualSpecialization = "Specialization is required.";
    // Class Teacher Of
    if (!formDataTeacher.classTeacherOf.class)
      errors.classTeacherClass = "Class is required.";
    if (!formDataTeacher.classTeacherOf.section)
      errors.classTeacherSection = "Section is required.";
    // Salary
    if (!formDataTeacher.salary.basic)
      errors.salaryBasic = "Basic Salary is required.";
    else if (isNaN(formDataTeacher.salary.basic))
      errors.salaryBasic = "Basic Salary must be a number.";
    const bank = formDataTeacher.salary.bankDetails;
    if (!bank.accountNumber)
      errors.accountNumber = "Account Number is required.";
    else if (!/^\d+$/.test(bank.accountNumber))
      errors.accountNumber = "Account Number must be numeric.";
    if (!bank.bankName) errors.bankName = "Bank Name is required.";
    if (!bank.ifscCode) errors.ifscCode = "IFSC Code is required.";
    if (!bank.accountType) errors.accountType = "Account Type is required.";
    return errors;
  };

  // Handle input changes for nested fields
  const handleChange = (e, path) => {
    const value = e.target.value;
    setFormData((prev) => {
      const newData = { ...prev };
      if (path.length === 1) {
        newData[path[0]] = value;
      } else if (path[0] === "contactInfo") {
        if (path[1] === "address") {
          newData.contactInfo.address[path[2]] = value;
        } else {
          newData.contactInfo[path[1]] = value;
        }
      } else if (path[0] === "parentInfo") {
        newData.parentInfo[path[1]] = value;
      } else if (path[0] === "academicInfo") {
        newData.academicInfo[path[1]] = value;
      }
      return newData;
    });
  };

  // Validation function for student form
  const validateStudentForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.rollNumber) errors.rollNumber = "Roll Number is required.";
    if (!formData.class) errors.class = "Class is required and numeric only.";
    if (!formData.section) errors.section = "Section is required.";
    if (!formData.dateOfBirth)
      errors.dateOfBirth = "Date of Birth is required.";
    if (
      !formData.gender ||
      !["Male", "Female", "Other"].includes(formData.gender)
    )
      errors.gender = "Gender must be Male, Female, or Other.";
    // Contact Info
    if (!formData.contactInfo.email) errors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.contactInfo.email))
      errors.email = "Invalid email format.";
    if (!formData.contactInfo.phone) errors.phone = "Phone is required.";
    else if (!/^\d{10}$/.test(formData.contactInfo.phone))
      errors.phone = "Phone must be 10 digits.";
    if (!formData.contactInfo.address.street)
      errors.street = "Street is required.";
    if (!formData.contactInfo.address.city) errors.city = "City is required.";
    if (!formData.contactInfo.address.state)
      errors.state = "State is required.";
    if (!formData.contactInfo.address.pinCode)
      errors.pinCode = "Pin Code is required.";
    else if (!/^\d{6}$/.test(formData.contactInfo.address.pinCode))
      errors.pinCode = "Pin Code must be 6 digits.";
    // Parent Info
    if (!formData.parentInfo.fatherName)
      errors.fatherName = "Father's Name is required.";
    if (!formData.parentInfo.motherName)
      errors.motherName = "Mother's Name is required.";
    if (!formData.parentInfo.guardianContact)
      errors.guardianContact = "Guardian Contact is required.";
    else if (!/^\d{10}$/.test(formData.parentInfo.guardianContact))
      errors.guardianContact = " Guardian Contact must be 10 digits.";
    // Academic Info
    if (!formData.academicInfo.academicYear)
      errors.academicYear = "Academic Year is required.";
    if (!formData.academicInfo.admissionDate)
      errors.admissionDate = "Admission Date is required.";
    return errors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateStudentForm();
    setStudentErrors(errors);
    if (Object.keys(errors).length === 0 && schoolId) {
      let imageUrl = "";
      if (studentImg) {
        imageUrl = await handleFileUpload(studentImg);
      }
      addStudentService({
        schoolId: schoolId,
        ...formData,
        studentImageUrl: imageUrl,
      });
    }
  };

  // Handle input changes for nested teacher fields
  const handleChangeTeacher = (e, path) => {
    const value = e.target.value;
    setFormDataTeacher((prev) => {
      const newData = { ...prev };
      if (path.length === 1) {
        newData[path[0]] = value;
      } else if (path[0] === "contactInfo") {
        if (path[1] === "address") {
          newData.contactInfo.address[path[2]] = value;
        } else {
          newData.contactInfo[path[1]] = value;
        }
      } else if (path[0] === "professionalInfo") {
        if (path[1] === "qualification") {
          newData.professionalInfo.qualification[0][path[2]] = value;
        } else if (path[1] === "experience") {
          newData.professionalInfo.experience[0][path[2]] = value;
        } else {
          newData.professionalInfo[path[1]] = value;
        }
      } else if (path[0] === "classTeacherOf") {
        newData.classTeacherOf[path[1]] = value;
      } else if (path[0] === "salary") {
        if (path[1] === "bankDetails") {
          newData.salary.bankDetails[path[2]] = value;
        } else {
          newData.salary[path[1]] = value;
        }
      } else {
        newData[path[0]] = value;
      }
      return newData;
    });
  };

  const handleSubmitTeacher = (e) => {
    e.preventDefault();
    const errors = validateTeacherForm();
    setTeacherErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Here you can send formDataTeacher to backend API
      console.log("Submitted teacher enrollment:", formDataTeacher);
    }
  };

  return (
    <div className={styles.enrollmentsContainer}>
      <div className={styles.topRow}>
        <div className={styles.buttonsFilter}>
          <div className={`${styles.heading} text-body-m`}>Enrollment:</div>
          <div className={styles.informationType}>
            {enrollmentsTypeList.map((value) => (
              <button
                onClick={() => setEnrollmentsType(value)}
                className={`${styles.buttons} ${
                  enrollmentsType === value ? styles.active : ""
                } text-button`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enrollment Form student */}
      {enrollmentsType === "Student" && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Student Enrollment Form</h2>
          <div className={styles.formGroup}>
            <div className={styles.formSection}>
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange(e, ["name"])}
                required
              />
              {studentErrors.name && (
                <span className={styles.error}>{studentErrors.name}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Roll Number</label>
              <input
                type="text"
                value={formData.rollNumber}
                onChange={(e) => handleChange(e, ["rollNumber"])}
                required
              />
              {studentErrors.rollNumber && (
                <span className={styles.error}>{studentErrors.rollNumber}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Class</label>
              <input
                type="text"
                value={formData.class}
                onChange={(e) => handleChange(e, ["class"])}
                required
              />
              {studentErrors.class && (
                <span className={styles.error}>{studentErrors.class}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Student Image</label>
              <input
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={(e) => setStudentImg(e.target.files[0])}
              />
              {studentImagePreview && (
                <img
                  src={studentImagePreview}
                  alt="Preview"
                  className={styles.imagePreview}
                />
              )}
            </div>
            <div className={styles.formSection}>
              <label>Section</label>
              <input
                type="text"
                value={formData.section}
                onChange={(e) => handleChange(e, ["section"])}
                required
              />
              {studentErrors.section && (
                <span className={styles.error}>{studentErrors.section}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Date of Birth</label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange(e, ["dateOfBirth"])}
                required
              />
              {studentErrors.dateOfBirth && (
                <span className={styles.error}>
                  {studentErrors.dateOfBirth}
                </span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => handleChange(e, ["gender"])}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {studentErrors.gender && (
                <span className={styles.error}>{studentErrors.gender}</span>
              )}
            </div>
          </div>

          <h3>Contact Information</h3>
          <div className={styles.formGroup}>
            <div className={styles.formSection}>
              <label>Email</label>
              <input
                type="email"
                value={formData.contactInfo.email}
                onChange={(e) => handleChange(e, ["contactInfo", "email"])}
                required
              />
              {studentErrors.email && (
                <span className={styles.error}>{studentErrors.email}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Phone</label>
              <input
                type="text"
                value={formData.contactInfo.phone}
                onChange={(e) => handleChange(e, ["contactInfo", "phone"])}
                required
              />
              {studentErrors.phone && (
                <span className={styles.error}>{studentErrors.phone}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Street</label>
              <input
                type="text"
                value={formData.contactInfo.address.street}
                onChange={(e) =>
                  handleChange(e, ["contactInfo", "address", "street"])
                }
                required
              />
              {studentErrors.street && (
                <span className={styles.error}>{studentErrors.street}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>City</label>
              <input
                type="text"
                value={formData.contactInfo.address.city}
                onChange={(e) =>
                  handleChange(e, ["contactInfo", "address", "city"])
                }
                required
              />
              {studentErrors.city && (
                <span className={styles.error}>{studentErrors.city}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>State</label>
              <input
                type="text"
                value={formData.contactInfo.address.state}
                onChange={(e) =>
                  handleChange(e, ["contactInfo", "address", "state"])
                }
                required
              />
              {studentErrors.state && (
                <span className={styles.error}>{studentErrors.state}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Pincode</label>
              <input
                type="text"
                value={formData.contactInfo.address.pinCode}
                onChange={(e) =>
                  handleChange(e, ["contactInfo", "address", "pinCode"])
                }
                required
              />
              {studentErrors.pinCode && (
                <span className={styles.error}>{studentErrors.pinCode}</span>
              )}
            </div>
          </div>
          <h3>Parent Information</h3>
          <div className={styles.formGroup}>
            <div className={styles.formSection}>
              <label>Father's Name</label>
              <input
                type="text"
                value={formData.parentInfo.fatherName}
                onChange={(e) => handleChange(e, ["parentInfo", "fatherName"])}
                required
              />
              {studentErrors.fatherName && (
                <span className={styles.error}>{studentErrors.fatherName}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Mother's Name</label>
              <input
                type="text"
                value={formData.parentInfo.motherName}
                onChange={(e) => handleChange(e, ["parentInfo", "motherName"])}
                required
              />
              {studentErrors.motherName && (
                <span className={styles.error}>{studentErrors.motherName}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Guardian Contact</label>
              <input
                type="text"
                value={formData.parentInfo.guardianContact}
                onChange={(e) =>
                  handleChange(e, ["parentInfo", "guardianContact"])
                }
                required
              />
              {studentErrors.guardianContact && (
                <span className={styles.error}>
                  {studentErrors.guardianContact}
                </span>
              )}
            </div>
          </div>

          <h3>Academic Information</h3>
          <div className={styles.formGroup}>
            <div className={styles.formSection}>
              <label>Previous School</label>
              <input
                type="text"
                value={formData.academicInfo.previousSchool}
                onChange={(e) =>
                  handleChange(e, ["academicInfo", "previousSchool"])
                }
                required
              />
            </div>
            <div className={styles.formSection}>
              <label>Academic Year</label>
              <input
                type="text"
                value={formData.academicInfo.academicYear}
                onChange={(e) =>
                  handleChange(e, ["academicInfo", "academicYear"])
                }
                required
              />
              {studentErrors.academicYear && (
                <span className={styles.error}>
                  {studentErrors.academicYear}
                </span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Admission Date</label>
              <input
                type="date"
                value={formData.academicInfo.admissionDate}
                onChange={(e) =>
                  handleChange(e, ["academicInfo", "admissionDate"])
                }
                required
              />
              {studentErrors.admissionDate && (
                <span className={styles.error}>
                  {studentErrors.admissionDate}
                </span>
              )}
            </div>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </form>
      )}

      {/* Enrollment Form Teacher */}
      {enrollmentsType === "Teacher" && (
        <form className={styles.form} onSubmit={handleSubmitTeacher}>
          <h2>Teacher Enrollment Form</h2>
          <div className={styles.formGroup}>
            <div className={styles.formSection}>
              <label>School ID</label>
              <input
                type="text"
                value={formDataTeacher.schoolId}
                onChange={(e) => handleChangeTeacher(e, ["schoolId"])}
                required
              />
              {teacherErrors.schoolId && (
                <span className={styles.error}>{teacherErrors.schoolId}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Name</label>
              <input
                type="text"
                value={formDataTeacher.name}
                onChange={(e) => handleChangeTeacher(e, ["name"])}
                required
              />
              {teacherErrors.name && (
                <span className={styles.error}>{teacherErrors.name}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Employee ID</label>
              <input
                type="text"
                value={formDataTeacher.employeeId}
                onChange={(e) => handleChangeTeacher(e, ["employeeId"])}
                required
              />
              {teacherErrors.employeeId && (
                <span className={styles.error}>{teacherErrors.employeeId}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Date of Birth</label>
              <input
                type="date"
                value={formDataTeacher.dateOfBirth}
                onChange={(e) => handleChangeTeacher(e, ["dateOfBirth"])}
                required
              />
              {teacherErrors.dateOfBirth && (
                <span className={styles.error}>
                  {teacherErrors.dateOfBirth}
                </span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Gender</label>
              <select
                value={formDataTeacher.gender}
                onChange={(e) => handleChangeTeacher(e, ["gender"])}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {teacherErrors.gender && (
                <span className={styles.error}>{teacherErrors.gender}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Department</label>
              <input
                type="text"
                value={formDataTeacher.departemnt}
                onChange={(e) => handleChangeTeacher(e, ["departemnt"])}
                required
              />
              {teacherErrors.departemnt && (
                <span className={styles.error}>{teacherErrors.departemnt}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Status</label>
              <select
                value={formDataTeacher.status}
                onChange={(e) => handleChangeTeacher(e, ["status"])}
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {teacherErrors.status && (
                <span className={styles.error}>{teacherErrors.status}</span>
              )}
            </div>
          </div>
          <h3>Contact Information</h3>
          <div className={styles.formGroup}>
            <div className={styles.formSection}>
              <label>Email</label>
              <input
                type="email"
                value={formDataTeacher.contactInfo.email}
                onChange={(e) =>
                  handleChangeTeacher(e, ["contactInfo", "email"])
                }
                required
              />
              {teacherErrors.email && (
                <span className={styles.error}>{teacherErrors.email}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Phone</label>
              <input
                type="text"
                value={formDataTeacher.contactInfo.phone}
                onChange={(e) =>
                  handleChangeTeacher(e, ["contactInfo", "phone"])
                }
                required
              />
              {teacherErrors.phone && (
                <span className={styles.error}>{teacherErrors.phone}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Street</label>
              <input
                type="text"
                value={formDataTeacher.contactInfo.address.street}
                onChange={(e) =>
                  handleChangeTeacher(e, ["contactInfo", "address", "street"])
                }
                required
              />
              {teacherErrors.street && (
                <span className={styles.error}>{teacherErrors.street}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>City</label>
              <input
                type="text"
                value={formDataTeacher.contactInfo.address.city}
                onChange={(e) =>
                  handleChangeTeacher(e, ["contactInfo", "address", "city"])
                }
                required
              />
              {teacherErrors.city && (
                <span className={styles.error}>{teacherErrors.city}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>State</label>
              <input
                type="text"
                value={formDataTeacher.contactInfo.address.state}
                onChange={(e) =>
                  handleChangeTeacher(e, ["contactInfo", "address", "state"])
                }
                required
              />
              {teacherErrors.state && (
                <span className={styles.error}>{teacherErrors.state}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Pincode</label>
              <input
                type="text"
                value={formDataTeacher.contactInfo.address.pinCode}
                onChange={(e) =>
                  handleChangeTeacher(e, ["contactInfo", "address", "pinCode"])
                }
                required
              />
              {teacherErrors.pinCode && (
                <span className={styles.error}>{teacherErrors.pinCode}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Country</label>
              <input
                type="text"
                value={formDataTeacher.contactInfo.address.country}
                onChange={(e) =>
                  handleChangeTeacher(e, ["contactInfo", "address", "country"])
                }
                required
              />
              {teacherErrors.country && (
                <span className={styles.error}>{teacherErrors.country}</span>
              )}
            </div>
          </div>
          <h3>Professional Information</h3>
          <div className={styles.formGroup}>
            <div className={styles.formSection}>
              <label>Current Position</label>
              <input
                type="text"
                value={formDataTeacher.professionalInfo.currentPosition}
                onChange={(e) =>
                  handleChangeTeacher(e, [
                    "professionalInfo",
                    "currentPosition",
                  ])
                }
                required
              />
              {teacherErrors.currentPosition && (
                <span className={styles.error}>
                  {teacherErrors.currentPosition}
                </span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Joining Date</label>
              <input
                type="date"
                value={formDataTeacher.professionalInfo.joiningDate}
                onChange={(e) =>
                  handleChangeTeacher(e, ["professionalInfo", "joiningDate"])
                }
                required
              />
              {teacherErrors.joiningDate && (
                <span className={styles.error}>
                  {teacherErrors.joiningDate}
                </span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Experience Institution</label>
              <input
                type="text"
                value={
                  formDataTeacher.professionalInfo.experience[0].institution
                }
                onChange={(e) =>
                  handleChangeTeacher(e, [
                    "professionalInfo",
                    "experience",
                    "institution",
                  ])
                }
                required
              />
              {teacherErrors.expInstitution && (
                <span className={styles.error}>
                  {teacherErrors.expInstitution}
                </span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Experience Position</label>
              <input
                type="text"
                value={formDataTeacher.professionalInfo.experience[0].position}
                onChange={(e) =>
                  handleChangeTeacher(e, [
                    "professionalInfo",
                    "experience",
                    "position",
                  ])
                }
                required
              />
              {teacherErrors.expPosition && (
                <span className={styles.error}>
                  {teacherErrors.expPosition}
                </span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Experience Subject</label>
              <input
                type="text"
                value={formDataTeacher.professionalInfo.experience[0].subject}
                onChange={(e) =>
                  handleChangeTeacher(e, [
                    "professionalInfo",
                    "experience",
                    "subject",
                  ])
                }
                required
              />
              {teacherErrors.expSubject && (
                <span className={styles.error}>{teacherErrors.expSubject}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>From Year</label>
              <input
                type="number"
                value={formDataTeacher.professionalInfo.experience[0].fromYear}
                onChange={(e) =>
                  handleChangeTeacher(e, [
                    "professionalInfo",
                    "experience",
                    "fromYear",
                  ])
                }
                required
              />
              {teacherErrors.expFromYear && (
                <span className={styles.error}>
                  {teacherErrors.expFromYear}
                </span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>To Year</label>
              <input
                type="number"
                value={formDataTeacher.professionalInfo.experience[0].toYear}
                onChange={(e) =>
                  handleChangeTeacher(e, [
                    "professionalInfo",
                    "experience",
                    "toYear",
                  ])
                }
                required
              />
              {teacherErrors.expToYear && (
                <span className={styles.error}>{teacherErrors.expToYear}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Qualification Degree</label>
              <input
                type="text"
                value={formDataTeacher.professionalInfo.qualification[0].degree}
                onChange={(e) =>
                  handleChangeTeacher(e, [
                    "professionalInfo",
                    "qualification",
                    "degree",
                  ])
                }
                required
              />
              {teacherErrors.qualDegree && (
                <span className={styles.error}>{teacherErrors.qualDegree}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Qualification Institution</label>
              <input
                type="text"
                value={
                  formDataTeacher.professionalInfo.qualification[0].institution
                }
                onChange={(e) =>
                  handleChangeTeacher(e, [
                    "professionalInfo",
                    "qualification",
                    "institution",
                  ])
                }
                required
              />
              {teacherErrors.qualInstitution && (
                <span className={styles.error}>
                  {teacherErrors.qualInstitution}
                </span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Year Of Completion</label>
              <input
                type="number"
                value={
                  formDataTeacher.professionalInfo.qualification[0]
                    .yearOfCompletion
                }
                onChange={(e) =>
                  handleChangeTeacher(e, [
                    "professionalInfo",
                    "qualification",
                    "yearOfCompletion",
                  ])
                }
                required
              />
              {teacherErrors.qualYear && (
                <span className={styles.error}>{teacherErrors.qualYear}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Specialization</label>
              <input
                type="text"
                value={
                  formDataTeacher.professionalInfo.qualification[0]
                    .specialization
                }
                onChange={(e) =>
                  handleChangeTeacher(e, [
                    "professionalInfo",
                    "qualification",
                    "specialization",
                  ])
                }
                required
              />
              {teacherErrors.qualSpecialization && (
                <span className={styles.error}>
                  {teacherErrors.qualSpecialization}
                </span>
              )}
            </div>
          </div>
          <h3>Class Teacher Of</h3>
          <div className={styles.formGroup}>
            <div className={styles.formSection}>
              <label>Class</label>
              <input
                type="text"
                value={formDataTeacher.classTeacherOf.class}
                onChange={(e) =>
                  handleChangeTeacher(e, ["classTeacherOf", "class"])
                }
                required
              />
              {teacherErrors.classTeacherClass && (
                <span className={styles.error}>
                  {teacherErrors.classTeacherClass}
                </span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Section</label>
              <input
                type="text"
                value={formDataTeacher.classTeacherOf.section}
                onChange={(e) =>
                  handleChangeTeacher(e, ["classTeacherOf", "section"])
                }
                required
              />
              {teacherErrors.classTeacherSection && (
                <span className={styles.error}>
                  {teacherErrors.classTeacherSection}
                </span>
              )}
            </div>
          </div>
          <h3>Salary Details</h3>
          <div className={styles.formGroup}>
            <div className={styles.formSection}>
              <label>Basic</label>
              <input
                type="number"
                value={formDataTeacher.salary.basic}
                onChange={(e) => handleChangeTeacher(e, ["salary", "basic"])}
                required
              />
              {teacherErrors.salaryBasic && (
                <span className={styles.error}>
                  {teacherErrors.salaryBasic}
                </span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Account Number</label>
              <input
                type="text"
                value={formDataTeacher.salary.bankDetails.accountNumber}
                onChange={(e) =>
                  handleChangeTeacher(e, [
                    "salary",
                    "bankDetails",
                    "accountNumber",
                  ])
                }
                required
              />
              {teacherErrors.accountNumber && (
                <span className={styles.error}>
                  {teacherErrors.accountNumber}
                </span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Bank Name</label>
              <input
                type="text"
                value={formDataTeacher.salary.bankDetails.bankName}
                onChange={(e) =>
                  handleChangeTeacher(e, ["salary", "bankDetails", "bankName"])
                }
                required
              />
              {teacherErrors.bankName && (
                <span className={styles.error}>{teacherErrors.bankName}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>IFSC Code</label>
              <input
                type="text"
                value={formDataTeacher.salary.bankDetails.ifscCode}
                onChange={(e) =>
                  handleChangeTeacher(e, ["salary", "bankDetails", "ifscCode"])
                }
                required
              />
              {teacherErrors.ifscCode && (
                <span className={styles.error}>{teacherErrors.ifscCode}</span>
              )}
            </div>
            <div className={styles.formSection}>
              <label>Account Type</label>
              <input
                type="text"
                value={formDataTeacher.salary.bankDetails.accountType}
                onChange={(e) =>
                  handleChangeTeacher(e, [
                    "salary",
                    "bankDetails",
                    "accountType",
                  ])
                }
                required
              />
              {teacherErrors.accountType && (
                <span className={styles.error}>
                  {teacherErrors.accountType}
                </span>
              )}
            </div>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Enrollments;
