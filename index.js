const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config");

require("dotenv").config();

// Servidor de express
const app = express();

// DB
dbConnection();

// CORS
app.use(cors());

// Directorio publico
app.use(express.static("public"));

// Lectura y parseo body
app.use(express.json());

// Routes
// AUTH
app.use("/api/auth", require("./routes/auth"));
// CRUD
app.use("/api/events", require("./routes/events"));

const port = process.env.PORT;
// Listener
app.listen(port, () => {
  console.log("servidor corriendo en puerto: ", port);
});

console.log("hola mundo!!!");
