const Lead = require("../models/Lead");

// Create Lead
exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      user: req.user.id 
    });

    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Leads
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({
      user: req.user.id   
    });

    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Lead
exports.updateLead = async (req, res) => {
  try {
    const updated = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Lead
exports.deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ msg: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};