import React, { useState } from "react";
import styles from "./enrollments.module.scss";
import Icon from "../icon/icon";
import { enrollmentsTypeList } from "@/constants/app.constants";
import { useAuth } from "../../contexts/AuthContext";
import { addStudentService } from "@/services/studentsServices";
import { apibaseUrl } from "@/utils/utils";
import { addTeacherService, handleFileUpload } from "@/services/teacherServices";
import { useAcademicYear } from "@/contexts/academicYearContext";
import StudentAdmissionForm from "./student";
import TeacherForm from "./teacher";

const Enrollments = () => {
  const { user } = useAuth();
  const { academicYearId, isDesktop } = useAcademicYear();
  const schoolId = user?.schoolId;
  const [enrollmentsType, setEnrollmentsType] = useState("Student");
  // const [studentImg, setStudentImg] = useState(null);

  // const [formData, setFormData] = useState({
  //   schoolId,
  //   name: "",
  //   rollNumber: "",
  //   class: "",
  //   section: "",
  //   dateOfBirth: "",
  //   gender: "",
  //   contactInfo: {
  //     email: "",
  //     phone: "",
  //     address: {
  //       street: "",
  //       city: "",
  //       state: "",
  //       pinCode: "",
  //     },
  //   },
  //   parentInfo: {
  //     fatherName: "",
  //     motherName: "",
  //     guardianContact: "",
  //   },
  //   academicInfo: {
  //     previousSchool: "",
  //     academicYear: "",
  //     admissionDate: "",
  //   },
  //   studentImageUrl: "",
  // });

  // const [formDataTeacher, setFormDataTeacher] = useState({
  //   contactInfo: {
  //     address: {
  //       street: "",
  //       city: "",
  //       state: "",
  //       pinCode: "",
  //       country: "",
  //     },
  //     email: "",
  //     phone: "",
  //   },
  //   professionalInfo: {
  //     qualification: [
  //       {
  //         degree: "",
  //         institution: "",
  //         yearOfCompletion: "",
  //         specialization: "",
  //       },
  //     ],
  //     experience: [
  //       {
  //         institution: "",
  //         position: "",
  //         fromYear: "",
  //         toYear: "",
  //         subject: "",
  //       },
  //     ],
  //     joiningDate: "",
  //     currentPosition: "",
  //   },
  //   classTeacherOf: {
  //     class: "",
  //     section: "",
  //   },
  //   salary: {
  //     bankDetails: {
  //       accountNumber: "",
  //       bankName: "",
  //       ifscCode: "",
  //       accountType: "",
  //     },
  //     basic: "",
  //   },
  //   status: "Active",
  //   name: "",
  //   dateOfBirth: "",
  //   gender: "",
  //   schoolId: "",
  //   schedule: [],
  //   department: "",
  // });

  // const [studentImagePreview, setStudentImagePreview] = useState("");

  // const [studentErrors, setStudentErrors] = useState({});
  // const [teacherErrors, setTeacherErrors] = useState({});

  // Validation function for teacher form
  // const validateTeacherForm = () => {
  //   const errors = {};
  //   if (!formDataTeacher.name) errors.name = "Name is required.";
  //   if (!formDataTeacher.dateOfBirth)
  //     errors.dateOfBirth = "Date of Birth is required.";
  //   if (
  //     !formDataTeacher.gender ||
  //     !["Male", "Female"].includes(formDataTeacher.gender)
  //   )
  //     errors.gender = "Gender must be Male or Female.";
  //   if (!formDataTeacher.department)
  //     errors.department = "Department is required.";
  //   if (!formDataTeacher.status) errors.status = "Status is required.";
  //   // Contact Info
  //   if (!formDataTeacher.contactInfo.email) errors.email = "Email is required.";
  //   else if (!/^\S+@\S+\.\S+$/.test(formDataTeacher.contactInfo.email))
  //     errors.email = "Invalid email format.";
  //   if (!formDataTeacher.contactInfo.phone) errors.phone = "Phone is required.";
  //   else if (!/^\d{10}$/.test(formDataTeacher.contactInfo.phone))
  //     errors.phone = "Phone must be 10 digits.";
  //   if (!formDataTeacher.contactInfo.address.street)
  //     errors.street = "Street is required.";
  //   if (!formDataTeacher.contactInfo.address.city)
  //     errors.city = "City is required.";
  //   if (!formDataTeacher.contactInfo.address.state)
  //     errors.state = "State is required.";
  //   if (!formDataTeacher.contactInfo.address.pinCode)
  //     errors.pinCode = "Pin Code is required.";
  //   else if (!/^\d{6}$/.test(formDataTeacher.contactInfo.address.pinCode))
  //     errors.pinCode = "Pin Code must be 6 digits.";
  //   if (!formDataTeacher.contactInfo.address.country)
  //     errors.country = "Country is required.";
  //   // Professional Info
  //   if (!formDataTeacher.professionalInfo.currentPosition)
  //     errors.currentPosition = "Current Position is required.";
  //   if (!formDataTeacher.professionalInfo.joiningDate)
  //     errors.joiningDate = "Joining Date is required.";
  //   // Experience
  //   const exp = formDataTeacher.professionalInfo.experience[0];
  //   if (!exp.institution)
  //     errors.expInstitution = "Experience Institution is required.";
  //   if (!exp.position) errors.expPosition = "Experience Position is required.";
  //   if (!exp.subject) errors.expSubject = "Experience Subject is required.";
  //   if (!exp.fromYear) errors.expFromYear = "From Year is required.";
  //   else if (!/^\d{4}$/.test(exp.fromYear))
  //     errors.expFromYear = "From Year must be 4 digits.";
  //   if (!exp.toYear) errors.expToYear = "To Year is required.";
  //   else if (!/^\d{4}$/.test(exp.toYear))
  //     errors.expToYear = "To Year must be 4 digits.";
  //   // Qualification
  //   const qual = formDataTeacher.professionalInfo.qualification[0];
  //   if (!qual.degree) errors.qualDegree = "Qualification Degree is required.";
  //   if (!qual.institution)
  //     errors.qualInstitution = "Qualification Institution is required.";
  //   if (!qual.yearOfCompletion)
  //     errors.qualYear = "Year Of Completion is required.";
  //   else if (!/^\d{4}$/.test(qual.yearOfCompletion))
  //     errors.qualYear = "Year Of Completion must be 4 digits.";
  //   if (!qual.specialization)
  //     errors.qualSpecialization = "Specialization is required.";
  //   // Class Teacher Of
  //   if (!formDataTeacher.classTeacherOf.class)
  //     errors.classTeacherClass = "Class is required.";
  //   if (!formDataTeacher.classTeacherOf.section)
  //     errors.classTeacherSection = "Section is required.";
  //   // Salary
  //   if (!formDataTeacher.salary.basic)
  //     errors.salaryBasic = "Basic Salary is required.";
  //   else if (isNaN(formDataTeacher.salary.basic))
  //     errors.salaryBasic = "Basic Salary must be a number.";
  //   const bank = formDataTeacher.salary.bankDetails;
  //   if (!bank.accountNumber)
  //     errors.accountNumber = "Account Number is required.";
  //   else if (!/^\d+$/.test(bank.accountNumber))
  //     errors.accountNumber = "Account Number must be numeric.";
  //   if (!bank.bankName) errors.bankName = "Bank Name is required.";
  //   if (!bank.ifscCode) errors.ifscCode = "IFSC Code is required.";
  //   if (!bank.accountType) errors.accountType = "Account Type is required.";
  //   return errors;
  // };

  // // Handle input changes for nested fields
  // const handleChange = (e, path) => {
  //   const value = e.target.value;
  //   setFormData((prev) => {
  //     const newData = { ...prev };
  //     if (path.length === 1) {
  //       newData[path[0]] = value;
  //     } else if (path[0] === "contactInfo") {
  //       if (path[1] === "address") {
  //         newData.contactInfo.address[path[2]] = value;
  //       } else {
  //         newData.contactInfo[path[1]] = value;
  //       }
  //     } else if (path[0] === "parentInfo") {
  //       newData.parentInfo[path[1]] = value;
  //     } else if (path[0] === "academicInfo") {
  //       newData.academicInfo[path[1]] = value;
  //     }
  //     return newData;
  //   });
  // };

  // // Validation function for student form
  // const validateStudentForm = () => {
  //   const errors = {};
  //   if (!formData.name) errors.name = "Name is required.";
  //   if (!formData.rollNumber) errors.rollNumber = "Roll Number is required.";
  //   if (!formData.class) errors.class = "Class is required and numeric only.";
  //   if (!formData.section) errors.section = "Section is required.";
  //   if (!formData.dateOfBirth)
  //     errors.dateOfBirth = "Date of Birth is required.";
  //   if (
  //     !formData.gender ||
  //     !["Male", "Female", "Other"].includes(formData.gender)
  //   )
  //     errors.gender = "Gender must be Male, Female, or Other.";
  //   // Contact Info
  //   if (!formData.contactInfo.email) errors.email = "Email is required.";
  //   else if (!/^\S+@\S+\.\S+$/.test(formData.contactInfo.email))
  //     errors.email = "Invalid email format.";
  //   if (!formData.contactInfo.phone) errors.phone = "Phone is required.";
  //   else if (!/^\d{10}$/.test(formData.contactInfo.phone))
  //     errors.phone = "Phone must be 10 digits.";
  //   if (!formData.contactInfo.address.street)
  //     errors.street = "Street is required.";
  //   if (!formData.contactInfo.address.city) errors.city = "City is required.";
  //   if (!formData.contactInfo.address.state)
  //     errors.state = "State is required.";
  //   if (!formData.contactInfo.address.pinCode)
  //     errors.pinCode = "Pin Code is required.";
  //   else if (!/^\d{6}$/.test(formData.contactInfo.address.pinCode))
  //     errors.pinCode = "Pin Code must be 6 digits.";
  //   // Parent Info
  //   if (!formData.parentInfo.fatherName)
  //     errors.fatherName = "Father's Name is required.";
  //   if (!formData.parentInfo.motherName)
  //     errors.motherName = "Mother's Name is required.";
  //   if (!formData.parentInfo.guardianContact)
  //     errors.guardianContact = "Guardian Contact is required.";
  //   else if (!/^\d{10}$/.test(formData.parentInfo.guardianContact))
  //     errors.guardianContact = " Guardian Contact must be 10 digits.";
  //   // Academic Info
  //   if (!formData.academicInfo.academicYear)
  //     errors.academicYear = "Academic Year is required.";
  //   if (!formData.academicInfo.admissionDate)
  //     errors.admissionDate = "Admission Date is required.";
  //   return errors;
  // };


  // const handleSubmit = async (e) => {
  //   department:
  //   e.preventDefault();
  //   const errors = validateStudentForm();
  //   setStudentErrors(errors);
  //   if (Object.keys(errors).length === 0 && schoolId) {
  //     let imageUrl = "";
  //     if (studentImg) {
  //       imageUrl = await handleFileUpload(studentImg);
  //     }
  //   }

  //   const studentData = {
  //     schoolId,
  //     studentImageUrl: imageUrl,
  //     ...formData,
  //   };


  //   const payload = {
  //     academicYearId,
  //     data: studentData
  //   };

  //   addStudentService(payload)
  // }

  // // Handle input changes for nested teacher fields
  // const handleChangeTeacher = (e, path) => {
  //   const value = e.target.value;
  //   setFormDataTeacher((prev) => {
  //     const newData = { ...prev };
  //     if (path.length === 1) {
  //       newData[path[0]] = value;
  //     } else if (path[0] === "contactInfo") {
  //       if (path[1] === "address") {
  //         newData.contactInfo.address[path[2]] = value;
  //       } else {
  //         newData.contactInfo[path[1]] = value;
  //       }
  //     } else if (path[0] === "professionalInfo") {
  //       if (path[1] === "qualification") {
  //         newData.professionalInfo.qualification[0][path[2]] = value;
  //       } else if (path[1] === "experience") {
  //         newData.professionalInfo.experience[0][path[2]] = value;
  //       } else {
  //         newData.professionalInfo[path[1]] = value;
  //       }
  //     } else if (path[0] === "classTeacherOf") {
  //       newData.classTeacherOf[path[1]] = value;
  //     } else if (path[0] === "salary") {
  //       if (path[1] === "bankDetails") {
  //         newData.salary.bankDetails[path[2]] = value;
  //       } else {
  //         newData.salary[path[1]] = value;
  //       }
  //     } else {
  //       newData[path[0]] = value;
  //     }
  //     return newData;
  //   });
  // };

  // const handleSubmitTeacher = async (e) => {
  //   e.preventDefault();
  //   const errors = validateTeacherForm();
  //   setTeacherErrors(errors);
  //   if (Object.keys(errors).length === 0 && schoolId) {
  //     // Teacher details
  //     const teacherData = {
  //       schoolId,
  //       ...formDataTeacher,
  //     };

  //     const payload = {
  //       academicYearId,
  //       data: teacherData
  //     };
  //     addTeacherService(payload);
  //   }
  // };

  return (
    <div className={styles.enrollmentsContainer}>

      {isDesktop?(<div className={styles.topRow}>
        <div className={styles.buttonsFilter}>
          {/* <div className={`${styles.heading} text-body-m`}>Enrollment:</div> */}
          <div className={styles.informationType}>
            {enrollmentsTypeList.map((value) => (
              <button
                onClick={() => setEnrollmentsType(value)}
                className={`${styles.buttons} ${enrollmentsType === value ? styles.active : ""
                  } text-button`}
              >
                {value}
              </button>
            ))}
          </div>

          <div className={styles.inputGroup}>
            <label>Select Enrollment Type</label>
            <select
              value={enrollmentsType}
              onChange={(e) => setEnrollmentsType(e.target.value)}
            >
              {
                enrollmentsTypeList.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))
              }
            </select>
          </div>
          {/* <div className={styles.heading}>{enrollmentsType !== "Student" ? "Teacher Information Form" : "Student Admission Form"}</div> */}
        </div>
      </div>):

      (<div className={styles.inputGroup}>
            <label>Select Enrollment Type</label>
            <select
              value={enrollmentsType}
              onChange={(e) => setEnrollmentsType(e.target.value)}
            >
              {
                enrollmentsTypeList.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))
              }
            </select>
      </div>)}

      {/* Enrollment Form student */}
      {enrollmentsType === "Student" && (
        <StudentAdmissionForm /> 
      )}

      {/* Enrollment Form Teacher */}
      {enrollmentsType === "Teacher" && (<TeacherForm />
      )}
    </div>
  );

}
export default Enrollments;
