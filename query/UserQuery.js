exports.GET_VEIRIFIED_PHARMACIES = "SELECT * FROM login INNER JOIN pharmacy ON  login.uid = pharmacy.uid AND login.verify =1 AND login.user_type = 'pharmacy' ";

exports.GET_ORDER_PLACED_PHRMACIES = "SELECT DISTINCT pharmacy.uid,pharmacy.username,pharmacy.address, pharmacy.open_time, pharmacy.close_time, pharmacy.rating FROM pharmacy JOIN orders ON  pharmacy.uid = orders.pharmacy_id JOIN register ON pharmacy.uid = register.pharmacy_id WHERE (orders.status='ongoing' AND register.uid = ?)";

exports.GET_VERIFIED_USER_BY_UID = "SELECT * FROM login WHERE uid =?";

exports.UPDATE_CUSTOMER_USERNAME = "UPDATE customer SET username = ? WHERE uid = ?"

exports.UPDATE_DELIVERYAGENT_USERNAME = "UPDATE delivery_agent SET username = ? WHERE uid = ?"

exports.UPDATE_PHARMACY_USERNAME = "UPDATE pharmacy SET username = ? WHERE uid = ?"

exports.UPDATE_ADMIN_USERNAME = "UPDATE admin SET username = ? WHERE uid = ?";

exports.UPDATE_CUSTOMER_TELEPHONE = "UPDATE customer SET contact_number = ? WHERE uid = ?"

exports.UPDATE_DELIVERYAGENT_TELEPHONE = "UPDATE delivery_agent SET contact_number = ? WHERE uid = ?"

exports.UPDATE_PHARMACY_TELEPHONE = "UPDATE pharmacy SET contact_number = ? WHERE uid = ?"

exports.UPDATE_ADMIN_TELEPHONE = "UPDATE admin SET contact_number = ? WHERE uid = ?"

exports.UPDATE_CUSTOMER_EMAIL = "UPDATE customer SET email = ? WHERE uid = ?"

exports.UPDATE_DELIVERYAGENT_EMAIL = "UPDATE delivery_agent SET email = ? WHERE uid = ?"

exports.UPDATE_PHARMACY_EMAIL = "UPDATE pharmacy SET email = ? WHERE uid = ?"

exports.UPDATE_ADMIN_EMAIL = "UPDATE admin SET email = ? WHERE uid = ?"

exports.UPDATE_PASSWORD = "UPDATE login SET password = ? WHERE uid = ?"

exports.UPDATE_CUSTOMER_PROFILE_PIC = "UPDATE customer SET profile_pic = ? WHERE uid = ?"

exports.UPDATE_DELIVERYAGENT_PROFILE_PIC = "UPDATE delivery_agent SET profile_pic = ? WHERE uid = ?"

exports.UPDATE_PHARMACY_PROFILE_PIC = "UPDATE pharmacy SET profile_pic = ? WHERE uid = ?"

exports.UPDATE_ADMIN_PROFILE_PIC = "UPDATE admin SET profile_pic = ? WHERE uid = ?"
