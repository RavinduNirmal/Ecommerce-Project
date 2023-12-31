const express = require("express");
const dbConnect = require("./Config/dbConnect.js");
const { notFound, errorHandler } = require("./Middlewares/errorHandler");
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000;
const authRouter=require('./Routes/authRoute.js');
const productRoute= require('./Routes/productRoute.js');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser =require('cookie-parser');
dbConnect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use('/api/user',authRouter);
app.use('/api/product',productRoute)

app.use(notFound);
app.use(errorHandler);
app.listen(PORT ,() =>{
    console.log(`Server is running on PORT ${PORT}`)
});
