const express = require("express");
const cors = require("cors");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

// Serve HTML, CSS, JS files
app.use(express.static(__dirname));

// Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "INDEX.html"));
});

// AI endpoint
app.post("/ask", async (req, res) => {
    try {
        const question = req.body.question;

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });

        const result = await model.generateContent(question);
        const answer = result.response.text();

        res.json({
            answer: answer
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            answer: "Error generating response."
        });
    }
});

// Render Port
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});