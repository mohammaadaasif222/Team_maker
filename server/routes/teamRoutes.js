const experss = require("express");
const router = experss.Router();
const {
  addMember,
  removeFromTeam, getTeams
} = require("../controllers/teamController");

router.route("/").get(getTeams).post(addMember);
router.route("/:id").delete(removeFromTeam)


module.exports = router;
