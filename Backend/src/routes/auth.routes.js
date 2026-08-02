import { Router } from "express";

import authController from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { registerSchema } from "../validators/auth.validator.js";
import { loginSchema } from "../validators/auth.validator.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  authController.register
);
router.post(
  "/login",
  validate(loginSchema),
  authController.login
);
router.get(
  "/me",
  authenticate,
  authController.me
);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

export default router;