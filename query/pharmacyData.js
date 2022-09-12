exports.GET_DATA_PHARMACY = "SELECT * FROM pharmacy WHERE uid =?";
exports.GET_PENDING_ORDER = "SELECT * FROM orders   WHERE pharmacy_id =?";
exports.GET_PHARMACY_DETAILS =  "SELECT * FROM login INNER JOIN pharmacy ON login.uid= ? AND login.verify = 1 AND login.uid = pharmacy.uid";