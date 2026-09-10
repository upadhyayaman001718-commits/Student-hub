import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export async function register(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { name, email, password } = req.body;

        const user = await registerUser(name, email, password);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
}

export async function login(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { email, password } = req.body;

        const result = await loginUser(email, password);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    } catch (error) {
        next(error);
    }
}