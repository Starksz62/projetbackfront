const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.APP_PORT;
const client = require("./client")
const cors = require("cors");
app.use(cors());
const router = require("./router");
app.use(express.json());
app.use("/api", router);

app.listen(port, async () => {
  console.info(`Server is listening on port ${port}`);
  try {
    const connection = await client.getConnection();
    console.info('Connexion à la base de données réussie.');
    connection.release();
  } catch (error) {
    console.error('Échec de la connexion à la base de données:', error.message);
  }
}).on("error", (err) => {
  console.error("Error:", err.message);
});