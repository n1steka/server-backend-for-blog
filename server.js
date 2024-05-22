const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("./middleware/logger.js");
const connectDB = require("./db");
dotenv.config({ path: "./config/config.env" });

//router routes
const userRoutes = require("./routes/user");
const postRouter = require("./routes/postRoute.js");
const commentRouter = require("./routes/commentRoute.js");
const errorHandler = require("./middleware/error.js");
connectDB();
const app = express();
app.use(cors());
app.use(logger);
app.use(express.json());
// global алдаа шаоган function

app.use(errorHandler);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/uploads", express.static(__dirname + "/uploads"));

const server = app.listen(
  process.env.PORT,
  console.log(`Express server is running on port ${process.env.PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandled rejection error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
