exports.GET_VEIRIFIED_PHARMACIES = "SELECT * FROM login INNER JOIN pharmacy ON  login.uid = pharmacy.uid AND login.verify =1 AND login.user_type = 'pharmacy' ";

exports.GET_ORDER_PLACED_PHRMACIES = "SELECT DISTINCT uid,username FROM pharmacy INNER JOIN orders ON  pharmacy.uid = orders.pharmacy_id";