import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: "teams",
  initialState: {
    item: [],
  },
  reducers: {
    addToTeam: (state, action) => {
      if (
        state.item.some(
          (user) =>
            user.id === action.payload.id ||
            user.domain === action.payload.domain
        )
      ) {
        return;
      } else {
        state.item.push(action.payload);
      }
    },
    removeFromTeam: (state, action) => {
      state.item = state.item.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addToTeam, removeFromTeam } = teamSlice.actions;
export default teamSlice.reducer;

export const saveTeamToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("teamData", serializedState);
  } catch (error) {
    console.error("Error saving team data to local storage:", error);
  }
};

export const loadTeamFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("teamData");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading team data from local storage:", error);
    return undefined;
  }
};


export const removeFromTeamLocalStorage = (userId) => {
  try {
    const serializedTeams = localStorage.getItem('teamData');
    if (serializedTeams === null) {
      return; 
    }
    const teams = JSON.parse(serializedTeams);

    const indexOfUser = teams.findIndex((user) => user.id === userId);
    if (indexOfUser !== -1) {
      teams.splice(indexOfUser, 1);
    }
    const updatedTeams = JSON.stringify(teams);
    localStorage.setItem('teamData', updatedTeams);
  } catch (error) {
    console.error('Error removing user from teams in local storage:', error);
  }
};
