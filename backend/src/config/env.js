import "dotenv/config";

export const ENV = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL,

    // Clerk (authentication)
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,

    // Inngest (event / workflow system)
    INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
    INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,

    // Cloudinary (media / image management)
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    CLIENT_URL: process.env.CLIENT_URL
};

/**
 * 🔍 Runtime Environment Diagnostics
 * NOTE: Do NOT log full secrets in production.
 */
console.log("🔧 ENV CHECK → NODE_ENV:", ENV.NODE_ENV);
console.log("🔐 ENV CHECK → CLERK_PUBLISHABLE_KEY exists:", Boolean(ENV.CLERK_PUBLISHABLE_KEY));
console.log("🔐 ENV CHECK → CLERK_SECRET_KEY exists:", Boolean(ENV.CLERK_SECRET_KEY));
console.log("🌐 ENV CHECK → CLIENT_URL:", ENV.CLIENT_URL);
