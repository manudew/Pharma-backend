exports.GET_CUSTOMER_DETAILS =  "SELECT * FROM login INNER JOIN customer ON login.uid= ? AND login.verify = 1 AND login.uid =customer.uid";