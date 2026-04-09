import jwt from "jsonwebtoken";
import { Client } from "../../generated/prisma/client";

type TokenPayload = Pick<Client, "id" | "email">;
type CompleteTokenPayload = TokenPayload & { iat: number; exp: number };

export class JWT {
    static generateToken(payload: TokenPayload): string {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
        });
    }

    static verifyToken(token: string): CompleteTokenPayload {
        return jwt.verify(token, process.env.JWT_SECRET) as CompleteTokenPayload;
    }
}
