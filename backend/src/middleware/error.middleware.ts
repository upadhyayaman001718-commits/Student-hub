import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error("🔥 ERROR CAPTURED IN ERROR MIDDLEWARE:", err);

    if (err.statusCode && typeof err.statusCode === "number") {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message || "An error occurred",
        });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "Resource not found in database",
            });
        }
        if (err.code === "P2002") {
            return res.status(409).json({
                success: false,
                message: "Conflict: A record with this value already exists",
            });
        }
    }

    const message = err.message || "Internal server error";

    return res.status(500).json({
        success: false,
        message,
    });
};