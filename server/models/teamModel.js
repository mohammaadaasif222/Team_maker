const mongoose = require("mongoose");

const teamSchema = mongoose.Schema(
  {
    teamMember: [
      {
        first_name: {
          type: String,
          required: true,
        },
        last_name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        gender: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
          required: true,
        },
        domain: {
          type: String,
          required: true,
          unique:true
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
