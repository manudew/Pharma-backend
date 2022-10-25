const express = require('express');
const adminRoute = express.Router();
const AdminController =  require('../controllers/AdminController');

adminRoute.post("/GetComplaints",AdminController.getComplaints);
adminRoute.post("/UpdatePanelty/:aID",AdminController.updatePanelty);
adminRoute.delete("/DeleteUser/:aID",AdminController.deleteUser);
adminRoute.get("/GetComplaintDetails/:id",AdminController.getComplaintDetails);
adminRoute.get("/GetDeliveryComplaintDetails/:id",AdminController.getDeliveryComplaintDetails);

module.exports = adminRoute;