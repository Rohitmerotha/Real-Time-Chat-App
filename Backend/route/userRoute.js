import express from "express"
import {getOtherUser, logout, signup} from "../controller/userController.js"
import {login} from "../controller/userController.js"
import isAuthenticated from "../middleware/isAuthenticated.js";
const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/logout",logout);
router.get("/",isAuthenticated,getOtherUser);
export default router;