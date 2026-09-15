import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const databaseUrl = process.env.DATABASE_URL || "";
const jwtSecret = process.env.JWT_SECRET || "dev-secret-key";

if (isProduction) {
  if (!databaseUrl) {
    console.warn("⚠️ WARNING: DATABASE_URL is not set in production environment!");
  }
  if (!process.env.JWT_SECRET) {
    console.warn("⚠️ WARNING: JWT_SECRET is not set in production environment!");
  }
}

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl,
  jwtSecret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  aws: {
    region: process.env.AWS_REGION || "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    bucketName: process.env.AWS_S3_BUCKET_NAME || process.env.AWS_BUCKET_NAME || "student-hub-assets",
  },
  frontendUrl: process.env.FRONTEND_URL || "",
};
