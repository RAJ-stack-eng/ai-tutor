async function sendMessage() {

    const input = document.getElementById("msg");
    const chat = document.getElementById("chat");

    const question = input.value.trim();

    if (!question) return;

    // Show user message
    chat.innerHTML += `
        <div class="user-msg">
            <b>You:</b> ${question}
        </div>
    `;

    input.value = "";

    // Loading message
    const loadingId = "load-" + Date.now();

    chat.innerHTML += `
        <div id="${loadingId}" class="ai-msg">
            <b>AI:</b> Thinking...
        </div>
    `;

    chat.scrollTop = chat.scrollHeight;

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

        document.getElementById(loadingId).innerHTML = `
            <b>AI:</b><br><br>
            ${data.answer.replace(/\n/g, "<br>")}
        `;

        chat.scrollTop = chat.scrollHeight;

    } catch (error) {

        document.getElementById(loadingId).innerHTML =
            "<b>AI:</b> Error connecting to server.";

        console.error(error);
    }
}

// Enter key support
document.getElementById("msg").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});