const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const routes = require("./routes/task");

const app = express();
const swaggerDocument = YAML.load("./swagger.yml");

mongoose.connect("mongodb://localhost:27017/task_management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/user", routes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
