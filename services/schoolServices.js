import { apibaseUrl } from "@/utils/utils";
export const getAllSchools = async () => {
  try {
    const res = await fetch(`${apibaseUrl}schools/all`);
    const data = await res.json(); 
    return data;
  } catch (err) {
    console.error("Error fetching schools", err);
    return [];
  }
};

export const getAllUser = async (schoolId) => { 
  try {
    const res = await fetch(`${apibaseUrl}users/${schoolId}`);
    const data = await res.json(); 
    return data;
  } catch (err) {
    console.error("Error fetching schools", err);
    return [];
  }
};

export const userUpdateService = async (payload) => {
  const {schoolId,userId ,newRole}=payload; 
  const response = await fetch(
    `${apibaseUrl}update-access/${schoolId}?userId=${userId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({newRole}),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  const result = await response.json();
  return result;
};

export const createUserService = async (payload) => {
   
  const response = await fetch(`${apibaseUrl}add-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }); 
  if (!response.ok) {
    throw new Error("Failed to add user");
  }
  const result = await response.json(); 
  return result;
};

export const deleteUserService = async (payload) => {
  try {
    const { schoolId, userId } = payload;

    const res = await fetch(
      `${apibaseUrl}delete-access/${schoolId}?userId=${userId}`,
      {
        method: "DELETE", // important
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      console.log(`Failed to delete user: ${res.statusText}`);
    }

    const data = await res.json(); 
    return data;
  } catch (err) {
    console.error("Error deleting user", err);
    return null;
  }
};

