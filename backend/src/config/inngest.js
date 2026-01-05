import { Inngest } from "inngest";
import connectDB from "../config/db.js";
import { User } from "../models/user.model.js";

// Create the Inngest client
export const inngest = new Inngest({ id: "ecommerce-mobile-app" });

// --- 1️⃣ User Creation ---
const syncUserCreation = inngest.createFunction(
    { id: "create-user" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        try {
            await connectDB();

            const { id: clerkId, email_addresses, first_name, last_name, image_url } =
                event.data;

            const newUser = {
                clerkId,
                email: email_addresses?.[0]?.email_address || "",
                name: `${first_name || ""} ${last_name || ""}`.trim() || "user",
                imageUrl: image_url || "",
                addresses: [],
                wishlist: [],
            }; 
            console.log(newUser)

            const user=await User.create(newUser);
            console.log(user)

        } catch (err) {
            // Only log errors
            console.error("Error creating user:", err);
            throw err;
        }
    }
);

// --- 2️⃣ User Update ---
const syncUserUpdation = inngest.createFunction(
    { id: "update-user" },
    { event: "clerk/user.updated" },
    async ({ event }) => {
        try {
            await connectDB();

            const { id: clerkId, email_addresses, first_name, last_name, image_url } =
                event.data;

            const newData = {
                email: email_addresses?.[0]?.email_address || "",
                name: `${first_name || ""} ${last_name || ""}`.trim() || "user",
                imageUrl: image_url || "",
            };

            await User.findOneAndUpdate(
                { clerkId },
                newData,
                { upsert: true, runValidators: true }
            );

        } catch (err) {
            console.error("Error updating user:", err);
            throw err;
        }
    }
);

// --- 3️⃣ User Deletion ---
const syncUserDeletion = inngest.createFunction(
    { id: "delete-user" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        try {
            await connectDB();

            const { id: clerkId } = event.data;
            if (!clerkId) return;

            await User.deleteOne({ clerkId });

        } catch (err) {
            console.error("Error deleting user:", err);
            throw err;
        }
    }
);

// --- Export all functions ---
export const functions = [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion
];
