import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
        throw new Error("User already exists");
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
        throw new Error("Invalid email or password");
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!passwordMatches) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1d",
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