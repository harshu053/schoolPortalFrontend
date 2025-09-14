import { useState } from "react";
import styles from "./studentEnrollment.module.scss";
import { useAcademicYear } from "@/contexts/academicYearContext";
import { addStudentService } from "@/services/studentsServices";
import { useAuth } from "@/contexts/AuthContext";

export default function StudentAdmissionForm() {
  const {academicYearId}=useAcademicYear();
  const {user}=useAuth();
  const schoolId=user?.schoolId;
  const [formData, setFormData] = useState({
    academicYearId,
    schoolId,
    studentName: "",
    dob: "",
    gender:"",
    className:"",
    section:"",
    fatherName: "",
    fatherEducation: "",
    emailId:"",
    fatherOccupation: "",
    motherName: "",
    motherEducation: "",
    motherOccupation: "",
    caste: "",
    subCaste: "",
    religion: "",
    address: "",
    localAddress: "",
    fatherMobile: "",
    homeContact: "",
    schoolLastAttended: "",
    aadhar: "",
    panCard: "",
    aaparId: "",
    sssmFid: "",
    sssmCid: "",
    bankHolder: "",
    bankName: "",
    accNo: "",
    ifsc: "",
    branchName: "",
    photo: null,
  });

   const [step, setStep] = useState(1);
      // Navigation
    const nextStep = () => setStep((s) => Math.min(5, s + 1));
    const prevStep = () => setStep((s) => Math.max(1, s - 1));

  // Handle normal input updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle multiple IDs (SSSM FID, SSSM CID)
  const handleArrayChange = (index, field, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const addArrayField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  // Handle profile photo
  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault(); 
    const payload = {
      academicYearId,   
      data: formData
    };
     
     addStudentService(payload);
  };

  return (
    <div className={styles.formContainer}> 
      <form onSubmit={handleSubmit} >
        <div className={styles. detailsContainer}>
        {/* Personal Info */}
        {step=="1" && <div className={styles.section}>
          <h2>Personal Information</h2>
          <label>Student Name:
            <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} />
          </label>
          <label>Gender:
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
          </label>
          <label>Class:
            <input type="text" name="className" value={formData.className} onChange={handleChange} />
          </label>
          <label>Section:
            <input type="text" name="section" value={formData.section} onChange={handleChange} />
          </label>
          <label>Date of Birth:
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          </label>
          <label>Email Id:
            <input type="text" name="emailId" value={formData.emailId} onChange={handleChange} />
          </label>
          <label>Caste:
            <input type="text" name="caste" value={formData.caste} onChange={handleChange} />
          </label>
          <label>Sub Caste:
            <input type="text" name="subCaste" value={formData.subCaste} onChange={handleChange} />
          </label>
          <label>Religion:
            <input type="text" name="religion" value={formData.religion} onChange={handleChange} />
          </label>
          <label>Upload Photo:
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
          <div className={styles.actions}> 
              <button type="button" onClick={nextStep}>Next</button>
          </div>
        </div>}

        {/* Parent Info */}
        { step=="2" &&<div className={styles.section}>
          <h2>Parent Information</h2>
          <label>Father's Name:
            <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} />
          </label>
          <label>Father's Education:
            <input type="text" name="fatherEducation" value={formData.fatherEducation} onChange={handleChange} />
          </label>
          <label>Father's Occupation:
            <input type="text" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} />
          </label>
          <label>Mother's Name:
            <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} />
          </label>
          <label>Mother's Education:
            <input type="text" name="motherEducation" value={formData.motherEducation} onChange={handleChange} />
          </label>
          <label>Mother's Occupation:
            <input type="text" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} />
          </label>
          <label>Father Mobile:
            <input type="text" name="fatherMobile" value={formData.fatherMobile} onChange={handleChange} />
          </label>
          <label>Home Contact:
            <input type="text" name="homeContact" value={formData.homeContact} onChange={handleChange} />
          </label>
          <div className={styles.actions}>
              <button type="button" onClick={prevStep}>Previous</button>
              <button type="button" onClick={nextStep}>Next</button>
          </div>
        </div>}

        {/* Address */}
        { step=="3" &&<div className={styles.section}>
          <h2>Address</h2>
          <label>Permanent Address:
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </label>
          <label>Local Address:
            <input type="text" name="localAddress" value={formData.localAddress} onChange={handleChange} />
          </label>

          <div className={styles.actions}>
              <button type="button" onClick={prevStep}>Previous</button>
              <button type="button" onClick={nextStep}>Next</button>
            </div>
        </div>}

        {/* IDs Section */}
        { step=="4" &&<div className={styles.section}>
          <h2>Identification</h2>
          <label>Aadhar Number:
            <input type="text" name="aadhar" value={formData.aadhar} onChange={handleChange} />
          </label>
          <label>PAN Card Number:
            <input type="text" name="panCard" value={formData.panCard} onChange={handleChange} />
          </label>
          <label>AAPAR ID:
            <input type="text" name="aaparId" value={formData.aaparId} onChange={handleChange} />
          </label>
          <label>SSSM FID:
            <input type="text" name="sssmFid" value={formData.sssmFid} onChange={handleChange} />
          </label>
          <label>SSSM CID:
            <input type="text" name="sssmCid" value={formData.sssmCid} onChange={handleChange} />
          </label>

          <div className={styles.actions}>
              <button type="button" onClick={prevStep}>Previous</button>
              <button type="button" onClick={nextStep}>Next</button>
            </div>

          {/* SSSM FID */}
          {/* <div className={styles.multiField}>
            <h3>SSSM FID</h3>
            {formData.sssmFid.map((fid, idx) => (
              <input key={idx} type="text" value={fid} onChange={(e) => handleArrayChange(idx, "sssmFid", e.target.value)} />
            ))}
            <button type="button" onClick={() => addArrayField("sssmFid")}>+ Add FID</button>
          </div> */}

          {/* SSSM CID */}
          {/* <div className={styles.multiField}>
            <h3>SSSM CID</h3>
            {formData.sssmCid.map((cid, idx) => (
              <input key={idx} type="text" value={cid} onChange={(e) => handleArrayChange(idx, "sssmCid", e.target.value)} />
            ))}
            <button type="button" onClick={() => addArrayField("sssmCid")}>+ Add CID</button>
          </div> */}
        </div>}

        {/* Bank Details */}
        { step=="5" &&<div className={styles.section}>
          <h2>Bank Details</h2>
          <label>Account Holder:
            <input type="text" name="bankHolder" value={formData.bankHolder} onChange={handleChange} />
          </label>
          <label>Bank Name:
            <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} />
          </label>
          <label>Account Number:
            <input type="text" name="accNo" value={formData.accNo} onChange={handleChange} />
          </label>
          <label>IFSC Code:
            <input type="text" name="ifsc" value={formData.ifsc} onChange={handleChange} />
          </label>
          <label>Branch Name:
            <input type="text" name="branchName" value={formData.branchName} onChange={handleChange} />
          </label>

          <div className={styles.actions}>
              <button type="button" onClick={prevStep}>Previous</button>
              <button type="submit" className={styles.submitBtn}>Submit Form</button>
            </div>
        </div>}
        </div>
      </form>
    </div>
  );
}
