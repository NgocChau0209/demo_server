import { Router } from "express";

import UserCallback from "../controller/User";
const UserRouter = Router();


UserRouter.post("/check-email", UserCallback.checkEmailExist);
UserRouter.post("/check-phone-number", UserCallback.checkPhoneNumberExist);
UserRouter.post("/create", UserCallback.create);
UserRouter.post("/login", UserCallback.login);
// UserRouter.post("/create-new-user", UserCallback.create);
UserRouter.post("/", UserCallback.get);
// UserRouter.post("/with-draw", UserCallback.withDraw);
// UserRouter.post("/recharge", UserCallback.recharge);
// UserRouter.get("/:id", UserCallback.getInfo);
// UserRouter.put("/:id", UserCallback.update);
// UserRouter.delete("/:id", UserCallback.delete);

export default UserRouter;
