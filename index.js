const express = require("express");
const connection = require("./config");
const app = express();
const port = 5000;
const studentsRouter = require("./routes/students.route");

app.use(express.json());
app.use("/students", studentsRouter);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is runing on ${port}`);
  }
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);

    return;
  }
  console.log("connected as id " + connection.threadId);
});
