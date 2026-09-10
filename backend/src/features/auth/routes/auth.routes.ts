import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { validate } from "../../../middleware/validate.middleware";
import { registerSchema, loginSchema } from "../validators/auth.schema";

const router = Router();
console.log("AUTH DEBUG");
console.log("register:", typeof register);
console.log("validate:", typeof validate);
console.log("validate result:", typeof validate(registerSchema));
router.post(
    "/register",
    validate(registerSchema),
    register
);
router.post(
    "/login",
    validate(loginSchema),
    login
);

export default router;