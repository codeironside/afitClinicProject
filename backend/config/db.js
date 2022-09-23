const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.OFFLINEMONGOURI);
    let gfs;

    conn.once("open", () => {
      // Init stream
      gfs = Grid(conn.db, mongoose.mongo);
      gfs.collection("uploads");
    });
    console.log(`Mongodb connected:${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
