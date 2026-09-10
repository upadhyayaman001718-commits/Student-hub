import { Router } from "express";
import resourceRoutes from "../features/resources/routes/resource.routes";
import authRoutes from "../features/auth/routes/auth.routes";

const router = Router();

router.use("/resources", resourceRoutes);
router.use("/auth", authRoutes);

export default router;