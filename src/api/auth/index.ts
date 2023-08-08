import { Router } from "express";
const router = Router();

import * as controller from "./auth.controller";

// router.post('/signup',controller.signup)
router.post("/login", controller.login);
router.get("/verify", controller.verify);

export default router;
