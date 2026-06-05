async function sendMessage() {

    let text = document.getElementById("msg").value.trim();

    if (text === "") return;

    let chat = document.getElementById("chat");

    const userTime = new Date().toLocaleTimeString();

    // User message
    chat.innerHTML += `
        <div class="user">
            <span>${text}</span><br>
            <small>${userTime}</small>
        </div>
    `;

    document.getElementById("msg").value = "";

    // Loading message
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "ai";
    loadingDiv.id = "loading";
    loadingDiv.textContent = "Thinking...";
    chat.appendChild(loadingDiv);

    chat.scrollTop = chat.scrollHeight;

    try {

        const response = await fetch("http://localhost:3000/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: text
            })
        });

        const data = await response.json();

        // Remove loading message
        document.getElementById("loading")?.remove();

        const aiTime = new Date().toLocaleTimeString();

        // AI message
        const aiDiv = document.createElement("div");
        aiDiv.className = "ai";

        const answer = document.createElement("pre");
        answer.textContent = data.answer;

        const time = document.createElement("small");
        time.textContent = aiTime;

        aiDiv.appendChild(answer);
        aiDiv.appendChild(time);

        chat.appendChild(aiDiv);

    } catch (error) {

        document.getElementById("loading")?.remove();

        chat.innerHTML += `
            <div class="ai">
                <span>Server not running!</span>
            </div>
        `;

        console.error(error);
    }

    chat.scrollTop = chat.scrollHeight;
}

// Enter key support
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("msg");

    input.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }

    });

});