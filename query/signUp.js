exports.CHECK_EMAIL = "SELECT * FROM login WHERE email =?";
exports.REGISTER_CUSTOMER = "INSERT INTO customer VALUES (NULL, ?)";
exports.REGISTER_PHARMACY = "INSERT INTO pharmacy VALUES (NULL, ?)";
exports.REGISTER_DELIVERY_AGENT = "INSERT INTO delivery_agent VALUES (NULL, ?)";
exports.REGISTER_ADMIN = "INSERT INTO admin VALUES (NULL, ?)";
exports.VERIFY_OTP = "SELECT * FROM login WHERE email = ? AND otp = ?";
exports.SET_VERIFY =  "UPDATE login SET verify = 1 WHERE email = ? AND otp = ?";

