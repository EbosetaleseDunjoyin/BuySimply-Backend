import express from "express";
import bodyParser from "body-parser";
import cors from "cors";


import authRoutes from "./routes/auth.js";

//Express Initialization
const app = express();


//Body Parser Initialization
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));

//Cors
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));


//Application Routes
app.use("/", authRoutes);