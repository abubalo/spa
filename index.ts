import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5500; 

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));