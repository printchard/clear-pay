import { User } from "@/app/db/schema";
import { z } from "zod";
import dayjs from "dayjs";
import jwt, { JwtPayload } from "jsonwebtoken";

const jwtPayloadSchema = z
  .object({
    email: z.string(),
    name: z.string(),
    id: z.string(),
  })
  .passthrough();

export type JWTPayloadType = z.infer<typeof jwtPayloadSchema> & JwtPayload;

export function issueJWT(user: User) {
  const payload = {
    iat: dayjs().toDate().getTime(),
    sub: user.id,
    email: user.email,
    name: user.name,
    id: user.id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return token;
}

export function verifyJWT(token: string): JWTPayloadType | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const parsed = jwtPayloadSchema.parse(decoded);
    return parsed;
  } catch (error) {
    console.error(error);
    return null;
  }
}
