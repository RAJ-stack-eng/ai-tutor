async function sendMessage() {

    const input = document.getElementById("msg");
    const chat = document.getElementById("chat");

    const question = input.value.trim();

    if (!question) return;

    chat.innerHTML += `<div><b>You:</b> ${question}</div>`;

    input.value = "";

    try {

        console.log("Sending:", question);

        const response = await fetch(
            "https://ai-hub-of-gen-z.onrender.com/ask",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    question: question
                })
            }
        );

        console.log("Status:", response.status);

        const data = await response.json();

        console.log("Response:", data);

        chat.innerHTML += `<div><b>AI:</b> ${data.answer}</div>`;

    } catch (error) {

        console.error("Fetch Error:", error);

        chat.innerHTML +=
            `<div><b>AI:</b> Error connecting to server.</div>`;
    }
}