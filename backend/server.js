const https = require("https");
const fs = require("fs");
const path = require("path");
const colors = require("colors");
const crypto = require("crypto");
const multer = require("multer");
const express = require("express");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const methodOverride = require("method-override");
const GridFsStorage = require("multer-gridfs-storage");
const { errorHandler } = require("./middleware/errormiddleware");

// const helmet = require("./middleware/helmet");
const app = express();
//port  number
const port = process.env.port || 5001;

const morgan = require("morgan");
const logger = require("./utils/logger");
const stafflogs = require("./utils/stafflogs");

//logger
app.use(morgan("tiny", { stream: logger.stream }));
// app.use(morgan('tiny', { stream: stafflogger.stream }));

connectDB();
// app.use(helmet);

//middlewares

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
// app.use(methodOverride("_method"));

app.use("/api/patient", require("./routes/staff"));


app.use("/api/patient", require("./routes/patient"));
app.use("/api/admin", require("./routes/Admin"))
 app.use("/api/drug", require("./routes/drugRoutes"));
app.use(errorHandler);
// https.createServer({
//     key:fs.readFileSync( "key.pem"),
//     cert:fs.readFileSync("cert.pem")
// },app).listen(port,()=>{
//     console.log(`server listening on ${port}`)
// } )

app.listen(port, () => {
  console.log(`server running on port ${port}`);
  logger.info(`server running on development`);
});
