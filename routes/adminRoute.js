const express = require('express');
const adminRoute = express.Router();
const AdminController =  require('../controllers/AdminController');

adminRoute.post("/GetComplaints",AdminController.getComplaints);
adminRoute.post("/GetAdminDetails",AdminController.getAdminDetails);
adminRoute.post("/GetPharmacyCount",AdminController.getPharmacyCount);
adminRoute.post("/GetCustomerCount",AdminController.getCustomerCount);
adminRoute.post("/GetDeliveryAgentCount",AdminController.getDeliveryAgentCount);
adminRoute.post("/GetMonthlyOrderCount",AdminController.getMonthlyOrderCount);
adminRoute.post("/GetBestPharmacies",AdminController.getBestPharmacies);
adminRoute.post("/GetBestAgents",AdminController.getBestAgents);
adminRoute.post("/GetGraphData",AdminController.getGraphData);

module.exports = adminRoute;