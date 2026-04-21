const express = require("express");
const router = express.Router();
const {
  createProperty,
  getProperties,
  updateProperty,
  deleteProperty
} = require("../controllers/propertyController");
const auth = require("../middleware/auth");

router.post("/", auth, createProperty);
router.get("/", auth, getProperties);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

module.exports = router;