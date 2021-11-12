import { Router } from "express";

import UserCallback from "../controller/User";
const UserRouter = Router();

UserRouter.post("/create-new-user", UserCallback.create);
UserRouter.get("/", UserCallback.get);
UserRouter.post("/with-draw", UserCallback.withDraw);
UserRouter.post("/recharge", UserCallback.recharge);
UserRouter.get("/:id", UserCallback.getInfo);
UserRouter.put("/:id", UserCallback.update);
UserRouter.delete("/:id", UserCallback.delete);

export default UserRouter;
