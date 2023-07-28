import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async ({ searchQuery, currentPage, domain, gender, isAvailable }) => {
    try {
      let API = `http://localhost:5000/api/users?`;
      if (searchQuery) {
        API += `keyword=${searchQuery}`;
      }
      if (currentPage) {
        API += `&page=${currentPage}`;
      }
      if (domain) {
        API += `&domain=${domain}`;
      }
      if (gender) {
        API += `&gender=${gender}`;
      }
      if (isAvailable !== undefined) {
        API += `&available=${isAvailable}`;
      }

      const response = await fetch(API);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching user data: " + error.message);
    }
  }
);

export const fetchSingleUser = createAsyncThunk(
  "users/fetchSingleUser",
  async  ({_id}) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${_id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching single user data: " + error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, userData }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }
);
