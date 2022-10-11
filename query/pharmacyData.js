exports.GET_DATA_PHARMACY = "SELECT * FROM pharmacy WHERE uid =?";
exports.GET_PENDING_ORDER = "SELECT * FROM orders   WHERE pharmacy_id =?";
exports.GET_PHARMACY_DETAILS =  "SELECT * FROM login INNER JOIN pharmacy ON login.uid= ? AND login.verify = 1 AND login.uid = pharmacy.uid";
exports.GET_ALL_ORDERS = "SELECT * FROM  orders JOIN customer ON orders.customer_id = customer.uid WHERE pharmacy_id =?"

exports.ADD_NEW_INVENTORY_ITEM = "INSERT INTO inventory(batch_No, pharmacy_id, brand_name, drug_name, quantity, expiry_date, manufacture_date, licenece_No, unit_price) VALUES (?,?,?,?,?,?,?,?,?)"
exports.GET_INVENTORY_ITEM = "SELECT * FROM inventory WHERE pharmacy_id = ? AND expiry_date = ? AND batch_No = ?";
exports.GET_ALL_INVENTORY_ITEMS = "SELECT * FROM inventory WHERE pharmacy_id = ?";
exports.DELETE_INVENTORY_ITEM = "DELETE FROM inventory WHERE pharmacy_id =? AND batch_No = ?";
exports.UPDATE_INVENTORY_ITEM = "UPDATE `inventory` SET brand_name=?,drug_name=?,quantity=?,expiry_date=?,manufacture_date=?,licenece_No=?,unit_price=? WHERE pharmacy_id =? AND batch_No = ?";
