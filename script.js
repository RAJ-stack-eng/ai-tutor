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

    } catch (error) {

        console.error(error);

        chat.innerHTML += `<div><b>AI:</b> Error connecting to server.</div>`;
    }
}