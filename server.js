const express = require("express");
const cors = require('cors');
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const PORT = process.env.PORT|| 3000;

const app = express();
app.listen(PORT,()=>{
    console.log(`This is express server running on PORT:${PORT} `)
})

app.use(cors())
app.use(express.json()); // to use json format in response
app.use("/api/contacts", require("./routes/contactRoutes")) // routes for contact
app.use("/api/users", require("./routes/userRoutes")) // routes for user registration & login
app.use(errorHandler) // for error handling of the API's

