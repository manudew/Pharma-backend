exports.GET_DATA_PHARMACY = "SELECT * FROM pharmacy WHERE uid =?";
exports.GET_PENDING_ORDER = "SELECT * FROM orders   WHERE pharmacy_id =?";
exports.GET_ALL_ORDERS = "SELECT * FROM  orders JOIN customer ON orders.customer_id = customer.uid WHERE pharmacy_id =?"