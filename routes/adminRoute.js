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

adminRoute.post("/UpdatePanelty/:aID",AdminController.updatePanelty);
adminRoute.post("/UpdateWhenClickDismiss/:aID",AdminController.updateWhenClickDismiss);
adminRoute.delete("/DeleteUser/:aID",AdminController.deleteUser);
adminRoute.get("/GetComplaintDetails/:id",AdminController.getComplaintDetails);
adminRoute.get("/GetDeliveryComplaintDetails/:id",AdminController.getDeliveryComplaintDetails);
adminRoute.get("/DissmissComplaint/:id",AdminController.dissmissComplaint);


module.exports = adminRoute;