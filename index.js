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

const allowedOrigins = [
  'http://localhost:5173',
  'https://full-stack-todo-with-role-based-and.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


    // app.use(cors({
    //   origin: process.env.FRONTEND_URL,
    //   credentials: true
    // }));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/api/v1",router);

dbConnection();
