const asyncHandler = require("express-async-handler");
const Team = require("../models/teamModel");

const addMember = asyncHandler(async (req, res) => {

  try {
    const team = await Team.create(req.body);
    res.status(201).json({
      success:true,
      team
    });
  } catch (error) {
    console.log(error);
  }
});

const getTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

const removeFromTeam = asyncHandler(async (req, res) => {
        try {
          const { userId,  } = req.params;
          const teams = await Team.find();

      
          const memberIndex = teams.teamMember.findIndex(
            (member) => member._id === userId
          );
      
          if (memberIndex === -1) {
            return res.status(404).json({ error: "Team member not found" });
          }
    
          teams.teamMember.splice(memberIndex, 1);
          await teams.save();
      
          res.json({ message: "Team member removed successfully" });
        } catch (error) {
          res.status(500).json({ error: "Server error" });
        }
      
  });
  
  

module.exports = { addMember, getTeams, removeFromTeam };
