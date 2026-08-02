import { Router } from "express";

import authenticate from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  createUrlSchema,
  updateUrlSchema,
} from "../validators/url.validator.js";

import urlController from "../controllers/url.controller.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(createUrlSchema),
  urlController.create
);

router.get(
  "/",
  authenticate,
  urlController.getMyUrls
);

// ✅ Put /stats BEFORE /:id
router.get(
  "/stats",
  authenticate,
  urlController.getStats
);

router.get(
  "/:id",
  authenticate,
  urlController.getUrlById
);

router.put(
  "/:id",
  authenticate,
  validate(updateUrlSchema),
  urlController.update
);

router.delete(
  "/:id",
  authenticate,
  urlController.delete
);

export default router;