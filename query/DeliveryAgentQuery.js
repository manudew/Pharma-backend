// exports.GET_CONFIRMED_ORDERS_DETAILS =  "SELECT * FROM orders WHERE delivery_agent_id= ? AND status='delivery'";

exports.GET_CONFIRMED_ORDERS_DETAILS =  ("SELECT order_id, c.username AS customer, p.username AS pharmacy, a.address, c.contact_number FROM orders a, customer c, pharmacy p WHERE (a.customer_id=c.uid AND a.pharmacy_id=p.uid AND a.delivery_agent_id=? AND a.status='delivering')")

exports.GET_COMPLETED_ORDERS_DETAILS = ("SELECT order_id, c.username AS customer, p.username AS pharmacy, a.address AS cAddress, c.contact_number AS cTelephone, p.address AS pAddress, p.contact_number AS pTelephone, delivery_fee FROM orders a, customer c, pharmacy p WHERE (a.customer_id=c.uid AND a.pharmacy_id=p.uid AND a.delivery_agent_id=? AND a.status='completed')")

exports.GET_DELIVERY_AGENT_DETAILS =  "SELECT * FROM login INNER JOIN delivery_agent ON login.uid= ? AND login.verify = 1 AND login.uid =delivery_agent.uid"

exports.UPDATE_COMPLETED_ORDER =  "UPDATE orders SET status='completed' WHERE order_id=?"

exports.GET_PHARMACY_ORDERS = ("SELECT a.order_id AS order_id, a.delivery_fee AS delivery_fee, c.username AS username, a.address AS address, c.contact_number AS contact_number FROM orders a, customer c WHERE (a.customer_id=c.uid AND a.pharmacy_id=? AND a.status='delivery')")

exports.UPDATE_GET_ORDER = "UPDATE orders SET status='delivering', delivery_agent_id=? WHERE order_id=?"

exports.GET_REGISTERED_PHARMACIES = "SELECT * FROM pharmacy INNER JOIN register ON pharmacy.uid=register.pharmacy_id WHERE register.uid=?"

exports.UNREGISTER_FROM_PHARMACIES = "DELETE FROM register WHERE (uid=? AND pharmacy_id=?)"

exports.GET_ALL_PHARMACIES = "SELECT * FROM pharmacy WHERE uid NOT IN (SELECT pharmacy.uid FROM pharmacy INNER JOIN register ON pharmacy.uid=register.pharmacy_id WHERE register.uid=?)"

exports.REGISTER_IN_NEW_PHARMACY = "INSERT INTO register VALUES (?, ?)"


//exports.GET_ORDER_CUSTOMER = "SELECT customer.contact_number AS cus_contact,customer.uid, delivery_agent.contact_number AS del_contact FROM orders JOIN customer ON customer.uid = orders.customer_id JOIN delivery_agent ON delivery_agent.uid=orders.delivery_agent_id WHERE order_id = ?"




exports.GET_AGENT_ORDERS = "SELECT COUNT(order_id) as Count,MONTHNAME(time_stamp) as 'Month', YEAR(time_stamp) as Year FROM orders WHERE delivery_agent_id = ? GROUP BY YEAR(time_stamp),MONTH(time_stamp)";

exports.GET_ORDER_CUSTOMER = "SELECT pharmacy_id customer.contact_number AS cus_contact,customer.uid, delivery_agent.contact_number AS del_contact FROM orders JOIN customer ON customer.uid = orders.customer_id JOIN delivery_agent ON delivery_agent.uid=orders.delivery_agent_id WHERE order_id = ?"

