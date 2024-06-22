const express = require("express");
const router = express.Router();
const { getContacts, createContact, getContact, updateContact, deleteContact } = require("../controllers/contactController"); //import controller
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);//all request need token verification so we can do it globally

router.route("/").get(getContacts);
// router.route("/").get(validateToken,getContacts);//another way if we want to verify token for any perticular request

router.route("/").post(createContact);

router.route("/:id").get(getContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

//another way for router
/*
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
*/

module.exports = router;