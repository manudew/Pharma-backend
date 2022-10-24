exports.GET_DATA_PHARMACY = "SELECT * FROM pharmacy WHERE uid =?";
exports.GET_PENDING_ORDER = "SELECT * FROM orders   WHERE pharmacy_id =?";
exports.GET_ALL_ORDERS = "SELECT * FROM  orders JOIN customer ON orders.customer_id = customer.uid WHERE pharmacy_id =?";
exports.GET_ONGOING_ORDER = "SELECT * FROM orders JOIN customer ON orders.customer_id = customer.uid   WHERE order_id =?";
exports.GET_DRUG_DETAILS = "SELECT * FROM inventory  WHERE pharmacy_id =?";
exports.SET_STATUS = "UPDATE orders SET status = 'delivery' WHERE order_id =?";
exports.SET_STATUS_TO_COMPLETE = "UPDATE orders SET status = 'completed' WHERE order_id =?;";
exports.DELETE_CUSTOMER ="DELETE FROM orders WHERE order_id=?";