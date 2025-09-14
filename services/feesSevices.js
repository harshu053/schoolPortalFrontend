import { apibaseUrl } from "@/utils/utils";

// http://localhost:5000/api/fees/SCH036482 get all class wise fees
// http://localhost:5000/api/fees/update/SCH036482 update fees structure of class wise fee
// http://localhost:5000/api/fees/delete/SCH036482  delete fees structure all the class

export const addFeesByClassWise = async (payload) => {
  console.log("entered in add class wise",payload); 
  try {
    const response = await fetch(`${apibaseUrl}class/fees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to add student");
    }
    const result = await response.json();
    alert("Classes saved successfully!");
    console.log(result);
  } catch (err) {
    console.error(err);
    alert("Error saving classes");
  }
};

export const getFeesByClasswise = async (schoolId) => {
  if (!schoolId) return "school Id is required";
  try {
    const response = await fetch(`${apibaseUrl}fees/${schoolId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const deleteFeesStruture = async (schoolId) => {
  try {
    const response = await fetch(`${apibaseUrl}fees/delete/${schoolId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete fee structure: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting fee structure:", error);
    throw error;
  }
};

export const updateFeesByClassWise = async (payload) => {
  const { schoolId, classes } = payload;
  console.log(classes);
  try {
    const response = await fetch(`${apibaseUrl}fees/update/${schoolId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ classWiseFees: classes }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update fee structure: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating fee structure:", error);
    throw error;
  }
};

// Submit Student Fees and transaction history detials

export const submitStudentFees = async (payload) => {
  const { transaction, updatedStudent, academicYearId } = payload;
  const { schoolId, studentId, ...rest } = transaction;
  try {
    const response = await fetch(
      `${apibaseUrl}submit/fee/${schoolId}?studentId=${studentId}&academicYearId=${academicYearId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transaction, updatedStudent }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update fee structure: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting student fee:", error);
    throw error;
  }
};

export const getAllFeeTransactionsHistory = async (payload) => {
  try {
    const { academicYearId, schoolId } = payload;
    if (!schoolId) return "school Id is required";
    const response = await fetch(
      `${apibaseUrl}transactions/${schoolId}?academicYearId=${academicYearId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const searchFeeTransactions = async (payload) => {
  try {
    const { schoolId, searchQuery, academicYearId } = payload;
    if (!schoolId) return "school Id is required";
    if (!searchQuery) return "searchQuery is required";
    const response = await fetch(
      `${apibaseUrl}transactions/search/${schoolId}?searchQuery=${searchQuery}&academicYearId=${academicYearId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching transactions:", error);
    throw error;
  }
};

export const getPendingFeeStudents = async (payload) => {
  try {
    const { schoolId, searchQuery, academicYearId } = payload;
    if (!schoolId) return "school Id is required";
    const response = await fetch(
      `${apibaseUrl}fees/pending/${schoolId}?academicYearId=${academicYearId}${
        searchQuery ? `&query=${searchQuery}` : ""
      }`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const getFullyPaidStudents = async (payload) => {
  try {
    const { schoolId, searchQuery, academicYearId } = payload;
    if (!schoolId) return "school Id is required";
    const response = await fetch(
      `${apibaseUrl}fees/fully-paid/${schoolId}?academicYearId=${academicYearId}${
        searchQuery ? `&query=${searchQuery}` : ""
      }`
    );

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};
