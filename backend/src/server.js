import 'dotenv/config'
import express from 'express'
import { ENV} from "./config/env.js";
import path from "path";
import connectDB from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import {functions, inngest} from "./config/inngest.js";
import { serve } from "inngest/express";

const app = express()

app.use(express.json())
app.use(clerkMiddleware())
const __dirname=path.resolve()

app.get('/api/health', (req, res) => {
    res.send('Hello World!')
})

app.use("/api/inngest", serve({ client: inngest, functions }));

if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname ,"../admin/dist")))
    app.get("/{*any}", (req, res) => {

        res.sendFile(path.join(__dirname ,"../admin","dist","index.html"))
    })
}
app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}!`)
connectDB()
})
