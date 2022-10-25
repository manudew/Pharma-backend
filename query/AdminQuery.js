exports.GET_ADMIN_DETAILS =  "SELECT * FROM login INNER JOIN admin ON login.uid= ? AND login.verify = 1 AND login.uid = admin.uid";

exports.GET_COMPLAINTS =  "SELECT * FROM complaint";

// exports.GET_ADMIN_DETAILS = "SELECT * FROM login WHERE uid=? AND verify=1";

exports.GET_PHARMACY_COUNT = "SELECT COUNT(uid) AS count FROM pharmacy";

exports.GET_CUSTOMER_COUNT = "SELECT COUNT(uid) AS count FROM customer";

exports.GET_DELIVERY_AGENT_COUNT = "SELECT COUNT(uid) AS count FROM delivery_agent";

exports.GET_MONTHLY_ORDER_COUNT = "SELECT status from orders where MONTH(time_stamp)=MONTH(now()) and YEAR(time_stamp)=YEAR(now())";

exports.GET_BEST_PHARMACIES =  "SELECT * FROM pharmacy ORDER BY rating DESC LIMIT 6";

exports.GET_BEST_AGENTS =  "SELECT * FROM delivery_agent ORDER BY rating DESC LIMIT 6";

exports.GET_GRAPH_DATA = "SELECT COUNT(order_id) as Count,MONTHNAME(time_stamp) as 'Month', YEAR(time_stamp) as Year FROM orders WHERE YEAR(time_stamp) = YEAR(CURDATE()) GROUP BY YEAR(time_stamp),MONTH(time_stamp)";