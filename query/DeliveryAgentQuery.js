// exports.GET_CONFIRMED_ORDERS_DETAILS =  "SELECT * FROM orders WHERE delivery_agent_id= ? AND status='delivery'";

exports.GET_CONFIRMED_ORDERS_DETAILS =  ("SELECT order_id, c.username AS customer, p.username AS pharmacy, a.address, c.contact_number FROM orders a, customer c, pharmacy p WHERE (a.customer_id=c.uid AND a.pharmacy_id=p.uid AND a.delivery_agent_id=? AND a.status='delivery')")

exports.GET_COMPLETED_ORDERS_DETAILS = ("SELECT order_id, c.username AS customer, p.username AS pharmacy, a.address AS cAddress, c.contact_number AS cTelephone, p.address AS pAddress, p.contact_number AS pTelephone, delivery_fee FROM orders a, customer c, pharmacy p WHERE (a.customer_id=c.uid AND a.pharmacy_id=p.uid AND a.delivery_agent_id=? AND a.status='completed')")

exports.GET_DELIVERY_AGENT_DETAILS =  "SELECT * FROM login INNER JOIN delivery_agent ON login.uid= ? AND login.verify = 1 AND login.uid =delivery_agent.uid"

exports.UPDATE_COMPLETED_ORDER =  "UPDATE orders SET status='completed' WHERE order_id=?"