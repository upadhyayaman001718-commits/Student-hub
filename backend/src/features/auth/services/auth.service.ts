import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../../config/env.config";
import {
    createUser,
    findUserByEmail,
} from "../repositories/user.respository";

export async function registerUser(
    name: string,
    email: string,
    password: string
) {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        const error: any = new Error("User with this email already exists");
        error.statusCode = 409;
        throw error;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, passwordHash);

    return {
        id: user.id,
        name: user.name,
        email: user.email,
    };
}

export async function loginUser(
    email: string,
    password: string
) {
    const user = await findUserByEmail(email);

    if (!user) {
        const error: any = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!passwordMatches) {
        const error: any = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
        },
        config.jwtSecret,
        {
            expiresIn: config.jwtExpiresIn as any,
        }
    );

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
    };
}