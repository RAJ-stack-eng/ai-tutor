const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

// Put your Gemini API key here
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
    res.send("AI Tutor Server Running!");
});

app.post("/ask", async (req, res) => {
    try {
        const question = req.body.question;

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash"
        });

        const result = await model.generateContent(
            `You are an AI tutor. Give detailed, clear, student-friendly answers.

Question:
${question}`
        );

        const answer = result.response.text();

        res.json({
            answer: answer
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            answer: "Error connecting to Gemini."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});