const express = require("express");
const router = express.Router();
const {
  createLead,
  getLeads,
  updateLead,
  deleteLead
} = require("../controllers/leadController");
const auth = require("../middleware/auth");


router.post("/", auth, createLead);
router.get("/", auth, getLeads);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

module.exports = router;