const express = require("express");
const router = express.Router();
const {
  getContacts,
  postContact,
  updateContact,
  getContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

//Normal way of writing routes
// //get all
// router.route("/").get(getContacts);
// //createa record
// router.route("/").post(postContact);
// //get single record
// router.route("/:id").get(getContact);
// //update single record
// router.route("/:id").put(updateContact);
// //delete single record
// router.route("/:id").delete(deleteContact);

//advance way of writing routes
router.use(validateToken)
router.route("/").get(getContacts).post(postContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
