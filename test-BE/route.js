import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api", (req, res) => {
  res.json({ message: "req was successful" });
});

app.get("/api", (req, res) => {
  res.json({ message: "req was successful" });
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
