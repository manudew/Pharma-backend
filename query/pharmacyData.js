exports.GET_DATA_PHARMACY = "SELECT * FROM pharmacy WHERE uid =?";
exports.GET_PENDING_ORDER = "SELECT * FROM orders   WHERE pharmacy_id =? ORDER BY order_id DESC";
exports.GET_PROFILE_DETAILS ="SELECT * FROM pharmacy WHERE uid=?";
exports.UPDATE_PHARMACY_NAME ="UPDATE pharmacy SET username = name WHERE uid =?;"

exports.GET_ALL_ORDERS = "SELECT * FROM  orders JOIN customer ON orders.customer_id = customer.uid WHERE pharmacy_id =?";
exports.GET_ONGOING_ORDER = "SELECT orders.order_id,orders.time_stamp, orders.status,customer.username as cname,customer.contact_number as customertelno,orders.prescription_image,orders.delivery_need,orders.feedback_report,orders.payment,orders.customer_approval,orders.delivery_fee,orders.address,delivery_agent.contact_number as deliverytelno,delivery_agent.username as deliveryname,delivery_agent.profile_pic FROM orders JOIN customer ON orders.customer_id = customer.uid JOIN delivery_agent ON orders.delivery_agent_id = delivery_agent.uid WHERE orders.order_id=?";

exports.GET_PENDING_ORDERS = "SELECT orders.order_id,orders.time_stamp, orders.status,customer.username as cname,customer.contact_number as customertelno,orders.prescription_image,orders.delivery_need,orders.feedback_report,orders.payment,orders.customer_approval,orders.delivery_fee,orders.address FROM orders JOIN customer ON orders.customer_id = customer.uid WHERE orders.order_id=?";

exports.GET_DRUG_DETAILS = "SELECT * FROM inventory  WHERE pharmacy_id =?";
exports.SET_STATUS = "UPDATE orders SET status = 'delivery' WHERE order_id =?";
exports.SET_STATUS_TO_COMPLETE = "UPDATE orders SET status = 'completed' WHERE order_id =?";
exports.DELETE_CUSTOMER ="DELETE FROM orders WHERE order_id=?";
exports.GET_PHARMACY_DETAILS =  "SELECT * FROM login INNER JOIN pharmacy ON login.uid= ? AND login.verify = 1 AND login.uid = pharmacy.uid";
exports.GET_ALL_ORDERS = "SELECT * FROM  orders JOIN customer ON orders.customer_id = customer.uid WHERE pharmacy_id =?"
exports.GET_ORDER = "SELECT * FROM  orders JOIN customer ON orders.customer_id = customer.uid WHERE pharmacy_id =? AND orders.order_id=?";
exports.UPLOAD_FEEDBACK = "UPDATE orders SET feedback_report=? , price=? WHERE order_id=?";

exports.ADD_NEW_INVENTORY_ITEM = "INSERT INTO inventory(batch_No, pharmacy_id, brand_name, drug_name, quantity, expiry_date, manufacture_date, licenece_No, unit_price) VALUES (?,?,?,?,?,?,?,?,?)"
exports.GET_INVENTORY_ITEM = "SELECT * FROM inventory WHERE pharmacy_id = ? AND batch_No = ?";
exports.GET_ALL_INVENTORY_ITEMS = "SELECT * FROM inventory WHERE pharmacy_id = ?";
exports.GET_LOWEST_INVENTORY_ITEMS = "SELECT * FROM inventory WHERE pharmacy_id = ? ORDER BY quantity ASC LIMIT 5";
exports.DELETE_INVENTORY_ITEM = "DELETE FROM inventory WHERE pharmacy_id =? AND batch_No = ?";
exports.UPDATE_INVENTORY_ITEM = "UPDATE `inventory` SET brand_name=?,drug_name=?,quantity=?,expiry_date=?,manufacture_date=?,licenece_No=?,unit_price=? WHERE pharmacy_id =? AND batch_No = ?";
exports.UPDATE_QUANTITY = "UPDATE `inventory` SET quantity=? WHERE pharmacy_id = ? AND batch_No = ?";

exports.GET_NOTIFCATION_DETAILS = "SELECT customer.contact_number FROM customer JOIN order ON order.customer_id = customer.uid WHERE order.order_id = ?"