const experss = require("express");
const router = experss.Router();
const {
  getAllUsers,
  getUserProfile,
  deleteUser
} = require("../controllers/authController");

router.route("/").get(getAllUsers);
router.route("/:id").get(getUserProfile).delete(deleteUser)


module.exports = router;
