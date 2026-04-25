const express= require("express");
const router = express.Router();


const {
    registerCustomer,
    loginCustomer,
    getCustomerProfile,
    getCustomerNotifications,
}= require("../controllers/customerController");

const {protect} = require("../middleware/authMiddleware");

//Public routes

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);

//Protected routes

router.get("/profile", protect, getCustomerProfile);
router.get("/notifications", protect, getCustomerNotifications);

module.exports = router;