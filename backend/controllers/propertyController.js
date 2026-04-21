const Property = require("../models/Property");

// Create Property
exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      user: req.user.id   
    });

    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Properties (with filter)
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      user: req.user.id   // filter by user
    });

    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Update Property
exports.updateProperty = async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Property
exports.deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ msg: "Property deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};