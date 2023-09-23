const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5500;

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")))
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
