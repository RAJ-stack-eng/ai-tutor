async function sendMessage() {

    const input = document.getElementById("msg");
    const chat = document.getElementById("chat");

    const question = input.value.trim();

    if (!question) return;

    chat.innerHTML += `<div><b>You:</b> ${question}</div>`;

    input.value = "";

    try {

        const response = await fetch("/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        chat.innerHTML += `<div><b>AI:</b> ${data.answer}</div>`;

        chat.scrollTop = chat.scrollHeight;

    } catch (error) {

        chat.innerHTML += `<div><b>AI:</b> Error connecting to server.</div>`;

        console.error(error);
    }
}

// Enter key support
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("msg");

    input.addEventListener("keypress", function(event) {

        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }

    });

});