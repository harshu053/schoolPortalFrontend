import React, { useEffect, useState } from "react";
import styles from "./feeSubmission.module.scss";
import { submitStudentFees } from "@/services/feesSevices";
import Receipt from "../feeReceipt/feeReceipt";
import Spinner from "@/components/spinner/spinner";
import FeeReceipt from "../feeReceipt/feeReceipt";
import { useAcademicYear } from "@/contexts/academicYearContext";

const FeeSubmission = ({ studentData, selectedStudent = null }) => { 
  const{academicYearId}=useAcademicYear();
  studentData=studentData?.filter(student=>student?.fee?.[0]?.pendingFee>0);
  const [student, setStudent] = useState(
    selectedStudent != null ? selectedStudent : null
  );
  const [className, setClassName] = useState("");
  const [amountPaid, setamountPaid] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [status, setStatus] = useState(student?.fee?.[0].status || "Not Paid");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [transactionId, setTransactionId] = useState("");
  const [open, setOpen] = useState(false);
  const [isSubmissionComplete, setIsSubmissionComplete] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [invalidAmount, setInvalidAmount] = useState(false);

  const handleSelect = (student) => {
    setStudent(student);
    setOpen(false);
    // onSelect(student);
  };

 const handleChange = (e) => {
  const value = Number(e.target.value);

  if (value <= 0 || value > (student?.fee?.[0]?.pendingFee || 0)) {
    setInvalidAmount(true);
  } else {
    setInvalidAmount(false);
  }
  setamountPaid(value);
};

  const handleSubmit = (e) => { 
    e.preventDefault();
    const transationPayload = {
      name: student.studentName,
      className: student.className,
      studentId: student._id,
      schoolId: student.schoolId,
      totalFeePaid: student?.fee?.[0].paidFee + amountPaid,
      pendingFees: student?.fee?.[0].pendingFee - amountPaid,
      totalFees: student?.fee?.[0].totalFee,
      amountPaid,
      paymentMethod,
      paymentDate,
      transactionId,
    };
    const updatedStudentPayload = {
      ...student,
      fee: student.fee.map((feeItem, index) => {
        if (index === 0) {
          const newPaid = feeItem.paidFee + amountPaid;
          const newPending = feeItem.pendingFee - amountPaid;
          return {
            ...feeItem,
            paidFee: newPaid,
            pendingFee: newPending,
            status,
          };
        }
        return feeItem;
      }),
    };
    setStudent(updatedStudentPayload);
    const payload = {
      transaction: transationPayload,
      updatedStudent: updatedStudentPayload,
      academicYearId,
    };
    const submitFee = async () => {
      const response = await submitStudentFees(payload);
      setTransactionDetails(response?.[0]?.newTransactionDetail);
    };

    submitFee();
    setIsSubmissionComplete(true);
  };

  return (
    <div className={styles.container}>
      {!isSubmissionComplete && !isReceiptOpen && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.heading}>Submit Fee Payment</h2>
          <p className={styles.subheading}>
            Fill in the details below to submit a student’s fee payment.
          </p>

          {/* Select Student & Class */}
          <section className={styles.section}>
            <h3>Select Student & Class</h3>
            <div className={styles.dropdown}>
              <div
                className={styles.dropdownHeader}
                onClick={() => setOpen(!open)}
              >
                {student?.studentName && student?.className
                  ? `${student.studentName} ${student.className}`
                  : "Select Student"}

                <span className={styles.arrow}>{open ? "▲" : "▼"}</span>
              </div>
              {open && (
                <ul className={styles.dropdownList}>
                  {studentData.map((student) => (
                    <li
                      key={student._id}
                      className={styles.dropdownItem}
                      onClick={() => handleSelect(student)}
                    >
                      {student.studentName} ({student.className})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p className={styles.outstanding}>
              Total Fees: <strong>₹{student?.fee?.[0].totalFee}</strong>
            </p>

            <p className={styles.outstanding}>
              Total Outstanding Fee:{" "}
              <strong>₹{student?.fee?.[0].pendingFee}</strong>
            </p>

            <button type="button" className={styles.viewBreakdown}>
              View Fee Breakdown
            </button>
          </section>

          {/* Payment Information */}
          <section className={styles.section}>
            <h3>Payment Information</h3>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option>Card</option>
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Netbanking</option>
                  <option>Cheque</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Enter Amount to Pay</label>
                <input
                  type="number"
                  value={amountPaid}
                  onChange={(e) => handleChange(e)}
                />
                {invalidAmount &&<span className={styles.errorMessage}>Please Enter Valid Amount</span>}
              </div>
              <div className={styles.inputGroup}>
                <label>Fee status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>Not Paid</option>
                  <option>Partially Paid</option>
                  <option>Full Paid</option>
                </select>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Payment Date</label>
                <input
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Transaction ID (Optional)</label>
                <input
                  type="text"
                  placeholder="Enter reference number"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Buttons */}
          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn}>
              Cancel
            </button>
            <button disabled={invalidAmount} type="submit" className={invalidAmount ? styles.disabled : styles.submitBtn}>
              Submit Payment
            </button>
          </div>
        </form>
      )}
      {isSubmissionComplete && !isReceiptOpen && (
        <div className={styles.pageWrapper}>
          {transactionDetails ? (
            <div className={styles.card}>
              <h2 className={styles.title}>🎉 Thank You!</h2>
              <p className={styles.subtitle}>
                Your fee payment has been recorded successfully.
              </p>
              <div className={styles.details}>
                <p>
                  <span>Student:</span> {transactionDetails.name}
                </p>
                <p>
                  <span>Transaction ID:</span>{" "}
                  {transactionDetails.transactionId || null}
                </p>
                <p>
                  <span>Total Fees:</span> ₹{transactionDetails.totalFees}
                </p>
                <p className={styles.paid}>
                  Amount Paid: ₹{transactionDetails.amountPaid}
                </p>
                <p className={styles.pending}>
                  Pending: ₹{transactionDetails.pendingFees}
                </p>
                <p>
                  <span>Payment Method:</span>{" "}
                  {transactionDetails.paymentMethod}
                </p>
                <p>
                  <span>Date:</span> {transactionDetails.paymentDate}
                </p>
              </div>
              <div className={styles.buttons}>
                <button
                  className={styles.downloadBtn}
                  onClick={() => setIsReceiptOpen(true)}
                >
                  ⬇️ Print Receipt
                </button>

                <button
                  onClick={() => setIsSubmissionComplete(false)}
                  className={styles.backBtn}
                >
                  Back to Fee Submission
                </button>
              </div>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      )}
      {isSubmissionComplete && isReceiptOpen && (
        <FeeReceipt
          data={transactionDetails} 
          setIsReceiptOpen={setIsReceiptOpen}
          isSubmissionComplete={setIsSubmissionComplete}
        />
      )}
    </div>
  );
};

export default FeeSubmission;
