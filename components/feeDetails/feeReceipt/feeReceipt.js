
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import styles from "./feeReceipt.module.scss";
import { useAuth } from "@/contexts/AuthContext";

export default function FeeReceipt({ data, setIsReceiptOpen, isSubmissionComplete }) {
  const { schoolDeatils } = useAuth();
  const receiptRef = useRef();

const handlePrint = useReactToPrint({
  contentRef: receiptRef,
  documentTitle: `FeeReceipt_${data?.studentId}`,
  pageStyle: `
    @page {
      size: A4 portrait;
      margin: 10mm;
    }
    body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .receiptContainer {
      width: 100% !important;
      min-height: 100% !important;
    }
  `,
  onAfterPrint: () => {
    // setIsReceiptOpen(false);
    // isSubmissionComplete(false);
  },
});


  return (
    <div>
      {/* <button onClick={handlePrint}>Print</button> */}

      {/* Attach ref directly here */}
      <div className={styles.container}>
      <div className={styles.receiptContainer} ref={receiptRef}>
        {/* Header */}
        <div className={styles.header}>
          <h1>{schoolDeatils?.schoolName}</h1>
          <h3>Fee Receipt</h3>
          <p>
            {schoolDeatils?.address?.landmark}, {schoolDeatils?.address?.city}, {schoolDeatils?.address?.state}, {schoolDeatils?.address?.pinCode}
          </p>
          <p>
            Phone: {schoolDeatils?.contact?.schoolPhone} | Email: {schoolDeatils?.contact?.schoolEmail}
          </p>
        </div>
        <hr />

        {/* Student Details */}
        <div className={styles.section}>
          <h3>Student Details</h3>
          <div className={styles.row}>
            <p><strong>Student Name:</strong> {data?.name}</p>
            <p><strong>Student ID:</strong> {data?.studentId}</p>
          </div>
          <div className={styles.row}>
            <p><strong>Class:</strong> {data?.className}</p>
            <p><strong>Academic Year:</strong> {data?.academicYear || "2025-2026"}</p>
          </div>
        </div>

        {/* Payment Details */}
        <div className={styles.section}>
          <h3>Payment Details</h3>
          <div className={styles.row}>
            <p><strong>Transaction ID:</strong> {data?.transactionId || "NA"}</p>
            <p><strong>Payment Date:</strong> {data?.paymentDate ? data.paymentDate.split("T")[0] : "NA"}</p>
          </div>
          <div className={styles.row}>
            <p><strong>Payment Method:</strong> {data?.paymentMethod || "NA"}</p>
            <p><strong>Amount Paid:</strong> {data?.amountPaid ?? 0}</p>
          </div>
        </div>

        {/* Fee Breakdown */}
        <div className={styles.section}>
          <h3>Total Fee Details</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Total Fee</td><td>{data?.totalFees ?? 0}</td></tr>
              <tr><td>Total Fee Paid</td><td>{data?.totalFeePaid ?? 0}</td></tr>
              <tr><td>Pending Fee</td><td>{data?.pendingFees ?? 0}</td></tr>
            </tbody>
          </table>
        </div>

        {/* Signature */}
        <div className={styles.signatureAndSealSection}>
          <div className={styles.signature}>Authorized Signature</div>
          <div className={styles.seal}>School Seal & Sign</div>
        </div>

        {/* Print Button */}
      <button className={styles.printBtn} onClick={handlePrint}>Print Receipt</button>
      </div>
      </div>
    </div>
  );
}




 