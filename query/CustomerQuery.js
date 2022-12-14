exports.GET_CUSTOMER_DETAILS =  "SELECT * FROM login INNER JOIN customer ON login.uid= ? AND login.verify = 1 AND login.uid =customer.uid";
exports.INSERT_ORDER = "INSERT INTO orders VALUES (NULL,?,NULL,?,?,?,NULL,0,?,?,?,350,CURRENT_TIMESTAMP(),'pending',0,NULL)";
exports.GET_ORDERS_BY_UID = "SELECT orders.order_id AS order_id , orders.customer_id As customer_id, orders.pharmacy_id As pharmacy_id, orders.delivery_agent_id As delivery_agent_id ,orders.address, orders.price , orders.payment, orders.delivery_need, orders.delivery_fee, orders.time_stamp, orders.status, orders.customer_approval, orders.feedback_report,pharmacy.username AS pharmacy_name, pharmacy.address AS pharmacy_address,pharmacy.contact_number As pharmacy_telephone, pharmacy.account_number As account_number, delivery_agent.username As delivery_agent_name, delivery_agent.contact_number As delivery_agent_telephone, delivery_agent.profile_pic As profile_pic FROM `orders` JOIN pharmacy On orders.pharmacy_id = pharmacy.uid  LEFT JOIN delivery_agent ON orders.delivery_agent_id = delivery_agent.uid WHERE customer_id = ? ORDER BY orders.order_id DESC";
exports.REJECT_ORDER = "DELETE FROM orders WHERE order_id = ?"
exports.ACCEPT_ORDER = "UPDATE orders SET customer_approval = 1, payment = 1 WHERE order_id = ?"
exports.RATE_PHARMACY = "UPDATE pharmacy SET rating = ? WHERE uid = ?"
exports.RATE_DELIVERY_AGENT = "UPDATE delivery_agent SET rating = ? WHERE uid = ?"

exports.STATUS_UPDATE_BY_CUSTOMER =  "UPDATE orders SET status = 'ongoing' WHERE order_id = ?"

exports.GET_USER_DETAILS = "SELECT username FROM customer WHERE uid=? ; SELECT contact_number FROM pharmacy WHERE uid=?"
exports.GET_USER_ACCEPTENCE_DETAILS = "SELECT customer_id, pharmacy_id FROM orders WHERE order_id=?"

