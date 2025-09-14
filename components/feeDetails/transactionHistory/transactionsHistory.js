import React, { useEffect, useState } from "react";
import styles from "./transactionsHistory.module.scss";
import {
  getAllFeeTransactionsHistory,
  searchFeeTransactions,
} from "@/services/feesSevices";
import { useAuth } from "@/contexts/AuthContext";
import Icon from "@/components/icon/icon";
import FeeReceipt from "../feeReceipt/feeReceipt";
import { useAcademicYear } from "@/contexts/academicYearContext";

const TransactionsHistory = ({ selectedClass, searchQuery }) => {
  const { user } = useAuth();
  const schoolId = user?.schoolId;
  const {academicYearId}=useAcademicYear();
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [data, setData] = useState(null);
  const [detailsToPrint, setDetailsToPrint] = useState(null);
  const [isPrintReceipt, setIsPrintReceipt] = useState(false);
  useEffect(() => {
    if (!schoolId || !academicYearId) return;
    const fetchTransactionHistory = async () => {
      const payload={academicYearId,schoolId};
      const data = await getAllFeeTransactionsHistory(payload);
      setTransactionHistory(data);
      setData(data);
    };
    fetchTransactionHistory();
  }, [schoolId,academicYearId]);

  useEffect(() => {
    if (selectedClass == "Select All") return; 
    const filteredData = data?.filter(
      (transaction) => transaction.className === selectedClass
    ); 
    setTransactionHistory(filteredData);
  }, [selectedClass, data]);

  useEffect(() => { 
    if (!searchQuery || searchQuery.trim() === "") {
      setTransactionHistory(data);
      return;
    }
    const getDataBysearchQuery = async () => {
      const payload = { searchQuery, schoolId,academicYearId };
      const response = await searchFeeTransactions(payload);
      setTransactionHistory(response);
    };
    getDataBysearchQuery();
  }, [searchQuery,schoolId,academicYearId]);

  const handlePrint = (transaction) => { 
    setDetailsToPrint(transaction);
    setIsPrintReceipt(true);
  };

  return (
    <div className={styles.container}>
      {!isPrintReceipt && (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Class</th>
                <th>Total Fee (₹)</th>
                <th>Paid Fee (₹)</th>
                <th>Pending Fee (₹)</th>
                <th>Amount Paid(₹)</th>
                <th>Payment Method</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            {/* <div className={styles.tableBody}> */}
            <tbody>
              {transactionHistory?.length > 0 ? (
                transactionHistory?.map((transaction, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{transaction?.name || null}</td>
                    <td>{transaction?.className || null}</td>
                    <td>{transaction?.totalFees || 0}</td>
                    <td>{transaction?.totalFeePaid || 0}</td>
                    <td className={styles.pending}>
                      {transaction?.pendingFees || 0}
                    </td>
                    <td>{transaction?.amountPaid || 0}</td>
                    <td>{transaction?.paymentMethod || null}</td>
                    <td>{transaction?.paymentDate.split("T")[0] || null}</td>
                    <td>
                      {/* <button
                      className={styles.editBtn}
                      onClick={() => handleEdit(transaction)}
                    //   disabled={activeButton==="Fully Paid transactions"}
                    >
                      <Icon iconName="IcEdit" />
                    </button> */}
                      <button
                        className={styles.printBtn}
                        onClick={() => handlePrint(transaction)}
                      >
                        Print Receipt
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={styles.noData}>
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
            {/* </div> */}
          </table>
        </div>
      )}
      {isPrintReceipt && (
        <div>
          <FeeReceipt data={detailsToPrint} />
        </div>
      )}
    </div>
  );
};

export default TransactionsHistory;
