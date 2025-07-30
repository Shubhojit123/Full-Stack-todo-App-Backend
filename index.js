const express = require("express");
const dbConnection = require("./config/dbConnection");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerOptions');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cookieParser())

const router = require("./router/router");
const PORT = process.env.PORT || 4000;


app.listen(PORT,()=>{
    console.log(`server started at  Port ${PORT}`);
});

    app.use(cors({
      origin: process.env.FRONTEND_URL,
      credentials: true
    }));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/api/v1",router);

dbConnection();
