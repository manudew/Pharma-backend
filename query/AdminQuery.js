exports.GET_ADMIN_DETAILS =  "SELECT * FROM login INNER JOIN admin ON login.uid= ? AND login.verify = 1 AND login.uid = admin.uid";

exports.GET_ALL_COMPLAINTS = "SELECT complaint.complaint_id, complaint.complaint, complaint.status, login.username, complaint.complainant_id, complaint.accused_person FROM complaint, login WHERE (complaint.examined=0 AND complaint.accused_person = login.uid)";

exports.GET_ALL_COMPLAINT_DETAILS = "SELECT customer.username AS cusName,customer.email AS cusEmail, complaint.complaint, complaint.time_stamp, pharmacy.username AS pName, pharmacy.reg_No, complaint.accused_person, pharmacy.contact_number, pharmacy.address, pharmacy.email, pharmacy.rating, login.panelty FROM complaint JOIN pharmacy ON complaint.accused_person = pharmacy.uid JOIN customer ON complaint.complainant_id = customer.uid JOIN login ON complaint.accused_person=login.uid WHERE complaint_id=?";

exports.GET_ALL_COMPLAINT_DETAILS_OF_DELIVERY = "SELECT customer.username AS cusName,customer.email AS cusEmail, complaint.complaint, complaint.time_stamp, delivery_agent.username AS dName, complaint.accused_person, delivery_agent.contact_number, delivery_agent.email, delivery_agent.rating, login.panelty FROM complaint JOIN delivery_agent ON complaint.accused_person = delivery_agent.uid JOIN customer ON complaint.complainant_id = customer.uid JOIN login ON complaint.accused_person=login.uid WHERE complaint_id=?";

exports.UPDATE_PANELTY = "UPDATE login INNER JOIN complaint ON complaint.accused_person = login.uid SET login.panelty = login.panelty+20 WHERE complaint.complaint_id=? ; UPDATE complaint SET examined=1 WHERE complaint_id=?";

exports.DELETE_USER = "DELETE FROM login WHERE uid=?";