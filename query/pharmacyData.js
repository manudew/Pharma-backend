exports.GET_DATA_PHARMACY = "SELECT * FROM pharmacy WHERE uid =?";
exports.GET_PENDING_ORDER = "SELECT * FROM orders   WHERE pharmacy_id =?";
exports.GET_PHARMACY_DETAILS =  "SELECT * FROM login INNER JOIN pharmacy ON login.uid= ? AND login.verify = 1 AND login.uid = pharmacy.uid";
exports.GET_ALL_ORDERS = "SELECT * FROM  orders JOIN customer ON orders.customer_id = customer.uid WHERE pharmacy_id =?"
exports.ADD_NEW_INVENTORY_ITEM = "INSERT INTO inventory(batch_No, pharmacy_id, brand_name, drug_name, quantity, expiry_date, manufacture_date, licenece_No, unit_price) VALUES (?,?,?,?,?,?,?,?,?)"
