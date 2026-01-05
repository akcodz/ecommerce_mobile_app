import 'dotenv/config'
import express from 'express'
import { ENV} from "./config/env.js";
import path from "path";

const app = express()

app.use(express.json())
const __dirname=path.resolve()

app.get('/api/health', (req, res) => {
    res.send('Hello World!')
})
if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname ,"../admin/dist")))
    app.get("/{*any}", (req, res) => {

        res.sendFile(path.join(__dirname ,"../admin","dist","index.html"))
    })
}
app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}!`)
})