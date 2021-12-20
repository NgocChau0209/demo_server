import { Router } from "express";
import { authenticateJWT } from "../module/auth";
import UserCallback from "../controller/User";
const UserRouter = Router();


UserRouter.post("/check-email", UserCallback.checkEmailExist);
UserRouter.post("/check-phone-number", UserCallback.checkPhoneNumberExist);
UserRouter.post("/create", UserCallback.create);
UserRouter.post("/login", UserCallback.login);
UserRouter.post("/", authenticateJWT, UserCallback.get);

export default UserRouter;
