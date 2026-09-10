import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "Resource not found",
            });
        }
    }

    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
};